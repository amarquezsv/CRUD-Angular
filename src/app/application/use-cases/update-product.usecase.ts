import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  execute(product: Product): Observable<Product> {
    return this.productRepository.updateProduct(product);
  }
}
