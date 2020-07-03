import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductListComponent } from '../product-list/product-list.component';
import { Router } from '@angular/router';
import { RepositoriesService } from 'src/app/core/services/repositories.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, from, BehaviorSubject, of } from 'rxjs';
import { ProductImage } from 'src/app/core/models/product-image.model';
import { map, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  form: FormGroup;
  img: any;
  productImage: ProductImage[];


  image$: Observable<any>;
  constructor(
    private formBuilder: FormBuilder,
    private repositoriesService: RepositoriesService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ProductListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.buildForm();
    }

  /*constructor(
    private formBuilder: FormBuilder,
    private repositoriesService: RepositoriesService,
    private router: Router,
  ) {
  }*/

  private buildForm() {
    this.form = this.formBuilder.group({
      productId: [null],
      title: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      price: [0, Validators.required],
      // price: [0, [Validators.required,MyValidators.isPriceValid]],
      productImage: this.formBuilder.array([
        this.formBuilder.group({
          productImageId: [''],
          fileImage: [''],
          productId: [''],
          fileImageAtt: ['']
        })
      ]),
      /*productImage: [{
        fileImage: ['']
      }],*/
      description: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
    });
  }

  ngOnInit( ) {
    const product = this.data.product;
    if (product.productId !== null) {
      this.spinnerService.show();
      this.repositoriesService.productsService.getProduct(product.productId)
        .subscribe(loadProduct => {

          loadProduct.productImage.forEach(function (value) {
            value.fileImage = 'data:image/jpeg;base64,' + value.fileImage;
            value.productId = loadProduct.productId;
          });

          // this.img = 'data:image/jpeg;base64,' + loadProduct.productImage[0].fileImage;
          this.form.patchValue(loadProduct);
          this.productImage = loadProduct.productImage;
          // console.log(this.form.get('productImage').value);
          // this.imagesListArray.subscribe(contacts => this.imagesListArray$.next(this.form.get('productImage').value));

          // this.imagesListArray$ = [loadProduct.productImage]
          // Observable.of(this.contacts);
          // this.imagesListArray$ = this.imagesListArray.asObservable();
          /*this.imagesListArray$.pipe(
            switchMap(imagesListArray => this.imagesListArray.pipe(
              map(() => [...imagesListArray])
            )),
          ).subscribe(imagesListArray => this.imagesListArray$.next(imagesListArray));*/

          // this.imagesListArray.subscribe(c => console.log(c[0].fileName));
          // console.log(this.imagesListArray.value);
          // const reader = new FileReader();
          // const img = this._base64ToArrayBuffer(loadProduct.productImage[0].fileImage);
          // reader.readAsArrayBuffer(img);
          // reader.onload = (image) => {
          //  this.img = reader.result;
          // };
          // this.img = 'data:image/jpeg;base64,' + loadProduct.productImage[0].fileImage;
        },
        err => {
          console.log(err);
        },
        () => {
          this.spinnerService.hide();
        }
      );
    }

  }
  onRemoveImage(event: Event) {
    event.preventDefault();
    const product = this.form.value;
    const productImageId = product.productImage[0].productImageId;
    const productImage = product.productImage[0];
    this.repositoriesService.productImageService.deleteImage(productImageId)
    .subscribe(productImageFlag => {
      const index = this.productImage.indexOf(productImage);
      this.productImage.splice(0, 1);
      // this.products =  [...this.products];
      this.toastr.warning('Product Deleted Successfully', 'Product');
    },
    err => {
      console.log(err);
      this.spinnerService.hide();
    },
    () => {
      this.spinnerService.hide();
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    this.spinnerService.show();
    if (this.form.valid) {
      const product = this.form.value;
      if (product.productId === null) {
        const productImage = Object.assign({}, product.productImage[0]); // JSON.parse(JSON.stringify(product.productImage[0]));
        delete product.productImage;
        this.repositoriesService.productsService.createProduct(product)
          .subscribe((newProduct) => {
            this.toastr.success('New Record Added Succcessfully', 'Product Register');
            if (productImage.productImageId === null) {
              productImage.productId = newProduct.productId;
              this.repositoriesService.productImageService.createProductImage(productImage).subscribe((images) => {
                console.log(images);
              },
              err => {
                console.log(err);
                // this.spinnerService.hide();
              },
              () => {
                // this.spinnerService.hide();
              });
            }
            this.dialogRef.close(newProduct);
          },
            err => {
              console.log(err);
              this.spinnerService.hide();
          },
          () => {
            this.spinnerService.hide();
          });
      } else {
        const productImage = Object.assign({}, product.productImage[0]); // JSON.parse(JSON.stringify(product.productImage[0]));
        product.productImage.forEach(function (value) {
          delete value.fileImage;
          delete value.fileImageAtt;
        });
        if ( (product.productImage[0].productImageId !== '')  ) {
          // delete product.productImage;
          
        }
        if (product.productImage[0].productImageId === null || product.productImage[0].productImageId === '' ) {
          delete product.productImage;
        }
        this.repositoriesService.productsService.updateProduct(product.productId, product)
          .subscribe((updatedProduct) => {
            // console.log(product);
            this.toastr.info('Record Updated Successfully!', 'Product Update');
            if (productImage.productImageId === null) {

              this.repositoriesService.productImageService.createProductImage(productImage).subscribe((images) => {
                console.log(images);
              },
              err => {
                console.log(err);
                // this.spinnerService.hide();
              },
              () => {
                // this.spinnerService.hide();
              });
            }
            this.dialogRef.close(product);
            // this.router.navigate(['./admin/products']);
          },
          err => {
            console.log(err);
            this.spinnerService.hide();
          },
          () => {
            this.spinnerService.hide();
          });
      }
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = 'image.png';

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (image) => {
      this.productImage = [
        {
          productImageId: null,
          fileImage: reader.result,
          fileImageAtt: file,
          productId: this.form.get('productId').value,
        }
      ];
      const product = this.form.value;
      product.productImage = this.productImage;
      this.form.patchValue(product);
      /*    
      productImageId: string;
    fileName: string;
    fileImage: string;
    productId: string;
    fileImageAtt: any;*/
      //this.img = reader.result;
    };
    //const fileRef = this.storage.ref(name);
    //const task = this.storage.upload(name, file);

    /*task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          this.form.get('image').setValue(url);
        });
      })
    )
    .subscribe();*/
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get totalImages() {
    if (typeof this.productImage !== 'undefined'){
      if (this.productImage.length > 0) {
        return true;
      }
    }
    return false;
  }


}
