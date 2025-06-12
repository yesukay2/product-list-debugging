import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cartItem, Product } from '../../app.module';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<cartItem[]>([]);
  public cart$: Observable<cartItem[]> = this.cartSubject.asObservable();

  constructor(private dessertsService: ProductService) {
    this.cartSubject.next([]);
  }

  addToCart(dessertName: string) {
    const dessertFound = this.isInCart(dessertName);
    if (dessertFound === -1) {
      const currentCart = this.cartSubject.getValue();
      const product = this.dessertsService.getProduct(dessertName);
      this.cartSubject.next([
        ...currentCart,
        {
          dessertName,
          quantity: 1,
          image: product?.image || {
            thumbnail: '',
            mobile: '',
            tablet: '',
            desktop: '',
          },
        },
      ]);
    }
    return;
  }

  quantityAction(dessertName: string, action: 'INCREASE' | 'DECREASE') {
    const dessertFound = this.isInCart(dessertName);
    if (dessertFound !== -1) {
      const currentCart = this.cartSubject.getValue();
      if (action === 'INCREASE') {
        currentCart[dessertFound].quantity += 1;
      }
      if (action === 'DECREASE') {
        currentCart[dessertFound].quantity -= 1;
      }
      this.cartSubject.next(currentCart);
    }
    return;
  }

  isInCart(dessertName: string): number {
    const currentCart = this.cartSubject.getValue();
    const dessertFound = currentCart.findIndex(
      (dessert_) => dessert_.dessertName === dessertName
    );
    return dessertFound;
  }

  removeFromCart(dessertName: string) {
    const dessertFound = this.isInCart(dessertName);
    if (dessertFound !== -1) {
      const currentCart = this.cartSubject.getValue();
      currentCart.splice(dessertFound, 1);
      this.cartSubject.next(currentCart);
    }
    return;
  }

  getTotal(): number {
    const currentCart = this.cartSubject.getValue();
    const total = currentCart.reduce((sum, cartItem) => {
      const desertInfo: Product | undefined = this.dessertsService.getProduct(
        cartItem.dessertName
      );
      if (!desertInfo) return sum + 0;
      return sum + cartItem.quantity * desertInfo.price;
    }, 0);
    return total;
  }
}
