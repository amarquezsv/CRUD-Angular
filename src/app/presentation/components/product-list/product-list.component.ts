import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../../domain/models/product.model';
import { GetAllProductsUseCase } from '../../../application/use-cases/get-all-products.usecase';
import { DeleteProductUseCase } from '../../../application/use-cases/delete-product.usecase';
import { ProductFormComponent } from '../product-form/product-form.component'; // ✅ Import child standalone component

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFormComponent], // ✅ Required modules and components
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProduct: Product | null = null;

  constructor(
    private getAllProductsUseCase: GetAllProductsUseCase,
    private deleteProductUseCase: DeleteProductUseCase
  ) {
    this.products$ = this.getAllProductsUseCase.execute();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products$ = this.getAllProductsUseCase.execute();
  }

  onEdit(product: Product): void {
    this.selectedProduct = { ...product };
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProductUseCase.execute(id).subscribe({
        next: () => {
          this.loadProducts();
          console.log('Product deleted successfully');
        },
        error: (err) => console.error('Error deleting product:', err)
      });
    }
  }

  onFormSubmitted(): void {
    this.selectedProduct = null;
    this.loadProducts();
  }

  onCancelEdit(): void {
    this.selectedProduct = null;
  }
}
