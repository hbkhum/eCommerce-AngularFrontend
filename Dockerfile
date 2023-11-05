# Utilizar la imagen node oficial como base
FROM node:16-alpine as build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json primero para aprovechar la caché de capas de Docker
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto del código fuente del proyecto
COPY . .

# Compilar la aplicación
RUN npm run build

# Establecer la imagen de runtime con Nginx
FROM nginx:alpine

# Copiar la configuración personalizada de Nginx al contenedor
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar la app compilada desde el directorio de distribución 'dist'
COPY --from=build /app/dist/store /usr/share/nginx/html

# Exponer el puerto 80 para el tráfico HTTP
EXPOSE 80

# Opcional: Comando para ejecutar nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
