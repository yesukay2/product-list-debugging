import { Component } from '@angular/core';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { ProductService } from './services/product.service';
import { ProductCardComponent } from './components/item-card/item-card.component';
import { CartComponent } from './components/cart/cart.component';

// interface
interface Dessert {
  image: DessertImages;
  name: string;
  category: string;
  price: number;
}

interface DessertImages {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}
@Component({
  selector: 'app-root',
  imports: [ProductCardComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Product list';
  desserts: Dessert[] = [];
  removedItemName: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.product$.subscribe((products) => {
      this.desserts = products;
    });
  }

  onRemoveItem(name: string) {
    this.removedItemName = name;
    setTimeout(() => {
      this.removedItemName = null;
    }, 100);
  }

  handleRemoveItem(name: string) {
    this.removedItemName = name;
    setTimeout(() => {
      this.removedItemName = null;
    }, 100);
  }
}
