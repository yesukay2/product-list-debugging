import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { CartService } from '../../services/cart.services.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss',
})
export class AddToCartComponent implements OnChanges {
  @Input({ required: true }) productName!: string;
  @Input() removedItem: string | null = null;
  @Output() isAddedToCartChange = new EventEmitter<boolean>();
  isAddedToCart = false;
  quantity = 1;

  constructor(private cartService: CartService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['removedItem'] && this.removedItem === this.productName) {
      this.isAddedToCart = false;
      this.quantity = 1;
      this.isAddedToCartChange.emit(false);
    }
  }

  addToCart() {
    this.isAddedToCart = true;
    this.cartService.addToCart(this.productName);
    this.isAddedToCartChange.emit(true);
  }

  decreaseProductItem() {
    if (this.quantity <= 1) {
      this.isAddedToCart = false;
      this.cartService.removeFromCart(this.productName);
      this.isAddedToCartChange.emit(false);
    } else {
      this.quantity--;
      this.cartService.quantityAction(this.productName, 'DECREASE');
    }
  }

  increaseProductItem() {
    this.quantity++;
    this.cartService.quantityAction(this.productName, 'INCREASE');
  }
}
