import { Injectable } from '@angular/core';
import { Product } from '../../../domain/models/product.model';

interface ProductStorageModel {
  id: number;
  name: string;
  price: number;
  units: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductLocalStorageAdapter {
  fromDomain(product: Product): ProductStorageModel {
    return { ...product };
  }
  toDomain(storageModel: ProductStorageModel): Product {
    return { ...storageModel };
  }
}
