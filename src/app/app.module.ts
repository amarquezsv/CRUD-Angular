import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductRepository } from './domain/repositories/product.repository';
import { ProductLocalStorageRepository } from './infrastructure/data/local-storage/product-local-storage.repository';
import { ProductFormComponent } from './presentation/components/product-form/product-form.component';


@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProductFormComponent
  ],
  exports: [ProductFormComponent],
  providers: [
    { provide: ProductRepository, useClass: ProductLocalStorageRepository }
  ]
})
export class AppModule { }
export class ProductFormModule { }


