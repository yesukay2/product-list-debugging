import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.services.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../app.module';

interface CartItemDisplay {
  name: string;
  quantity: number;
  price: number;
  total: number;
  image: { thumbnail: string };
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: CartItemDisplay[] = [];
  total: number = 0;
  showModal: boolean = false;

  @Output() removeItemEvent = new EventEmitter<string>();

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((cartItems) => {
      this.cartItems = cartItems.map((item) => {
        const product = this.productService.getProduct(item.dessertName);
        return {
          name: item.dessertName,
          quantity: item.quantity,
          price: product?.price || 0,
          total: (product?.price || 0) * item.quantity,
          image: product?.image || { thumbnail: '' },
        };
      });
      this.total = this.cartService.getTotal();
    });
  }

  removeItem(name: string) {
    this.cartService.removeFromCart(name);
    this.removeItemEvent.emit(name);
  }

  confirmOrder() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  startNewOrder() {
    this.cartService.clearCart();
  }
}
