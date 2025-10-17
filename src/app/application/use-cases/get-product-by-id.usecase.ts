import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
  providedIn: 'root'
})
export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  execute(id: number): Observable<Product | undefined> {
    return this.productRepository.getProductById(id);
  }
}
