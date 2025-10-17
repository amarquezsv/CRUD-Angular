import { Component } from '@angular/core';
import { ProductListComponent } from "./presentation/components/product-list/product-list.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ProductListComponent]
})
export class AppComponent {
  title = 'CRUD-Angular';
}
