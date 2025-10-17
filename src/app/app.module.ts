import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Needed for *ngIf, *ngFor

import { ProductRepository } from './domain/repositories/product.repository';
import { ProductLocalStorageRepository } from './infrastructure/data/local-storage/product-local-storage.repository';
import { ProductFormComponent } from './presentation/components/product-form/product-form.component';


@NgModule({
  // Module is used only for providing services and importing common modules.
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule, // Make *ngIf and *ngFor available
    ProductFormComponent
  ],
  exports: [ProductFormComponent],
  providers: [
    // Dependency Injection
    { provide: ProductRepository, useClass: ProductLocalStorageRepository }
  ]
})
export class AppModule { }
export class ProductFormModule { }


