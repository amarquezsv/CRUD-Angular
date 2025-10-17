import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../../../domain/models/product.model';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductLocalStorageAdapter } from './product-local-storage.adapter';

@Injectable({
  providedIn: 'root'
})
export class ProductLocalStorageRepository implements ProductRepository {
  private readonly STORAGE_KEY = 'products_crud_angular';
  private nextId: number = 1;

  constructor(private adapter: ProductLocalStorageAdapter) {
    const products = this.getProductsFromLocalStorage();
    if (products.length > 0) {
      this.nextId = Math.max(...products.map(p => p.id)) + 1;
    }
  }

  private getProductsFromLocalStorage(): Product[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data).map((item: any) => this.adapter.toDomain(item)) : [];
  }

  private saveProductsToLocalStorage(products: Product[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products.map(product => this.adapter.fromDomain(product))));
  }

  getAllProducts(): Observable<Product[]> {
    return of(this.getProductsFromLocalStorage());
  }

  getProductById(id: number): Observable<Product | undefined> {
    const products = this.getProductsFromLocalStorage();
    return of(products.find(p => p.id === id));
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const products = this.getProductsFromLocalStorage();
    const newProduct: Product = {
      ...product,
      id: this.nextId++
    };
    products.push(newProduct);
    this.saveProductsToLocalStorage(products);
    return of(newProduct);
  }

  updateProduct(product: Product): Observable<Product> {
    let products = this.getProductsFromLocalStorage();
    const index = products.findIndex(p => p.id === product.id);
    if (index > -1) {
      products[index] = { ...product };
      this.saveProductsToLocalStorage(products);
      return of(products[index]);
    }
    return throwError(() => new Error('Product not found for update'));
  }
  deleteProduct(id: number): Observable<boolean> {
    let products = this.getProductsFromLocalStorage();
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    if (products.length < initialLength) {
      this.saveProductsToLocalStorage(products);
      return of(true);
    }
    return throwError(() => new Error('Product not found for deletion'));
  }
}
