import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

export abstract class ProductRepository {
  abstract getAllProducts(): Observable<Product[]>;
  abstract getProductById(id: number): Observable<Product | undefined>;
  abstract createProduct(product: Omit<Product, 'id'>): Observable<Product>; 
  abstract updateProduct(product: Product): Observable<Product>;
  abstract deleteProduct(id: number): Observable<boolean>;
}
