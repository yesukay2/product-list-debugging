import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { Product } from '../../../app.module';

@Component({
  selector: 'app-product-card',
  imports: [AddToCartComponent],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) dessert: Product = {
    image: {
      thumbnail: '',
      mobile: '',
      tablet: '',
      desktop: '',
    },
    name: '',
    category: '',
    price: 0,
  };

  @Input() removedItem: string | null = null;
  isInCart = false;
}
