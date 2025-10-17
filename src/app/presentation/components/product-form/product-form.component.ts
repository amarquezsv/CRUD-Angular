import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../domain/models/product.model';
import { CreateProductUseCase } from '../../../application/use-cases/create-product.usecase';
import { UpdateProductUseCase } from '../../../application/use-cases/update-product.usecase';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() product: Product | null = null;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private createProductUseCase: CreateProductUseCase,
    private updateProductUseCase: UpdateProductUseCase
  ) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      units: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.setFormValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.productForm) {
      this.setFormValues();
    }
  }

  private setFormValues(): void {
    if (this.product) {
      this.productForm.patchValue({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        units: this.product.units
      });
    } else {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;

    if (this.product && this.product.id !== null) {
      const updatedProduct: Product = {
        id: formValue.id,
        name: formValue.name,
        price: formValue.price,
        units: formValue.units
      };
      this.updateProductUseCase.execute(updatedProduct).subscribe({
        next: () => {
          console.log('Product updated successfully');
          this.formSubmitted.emit();
          this.resetForm();
        },
        error: (err) => console.error('Error updating product:', err)
      });
    } else {
      const newProductData: Omit<Product, 'id'> = {
        name: formValue.name,
        price: formValue.price,
        units: formValue.units
      };
      this.createProductUseCase.execute(newProductData).subscribe({
        next: () => {
          console.log('Product created successfully');
          this.formSubmitted.emit();
          this.resetForm();
        },
        error: (err) => console.error('Error creating product:', err)
      });
    }
  }

  onCancel(): void {
    this.resetForm();
    this.cancel.emit();
  }

  private resetForm(): void {
    this.productForm.reset();
    this.productForm.get('price')?.setValue(0);
    this.productForm.get('units')?.setValue(0);
  }
}
