import { ProductImage } from './product-image.model';

export interface Product {
    productId: string;
    title: string;
    price: number;
    description: string;
    productImage: ProductImage[];
}
