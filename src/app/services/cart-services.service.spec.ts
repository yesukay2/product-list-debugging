import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { Product } from '../../app.module';

describe('CartService', () => {
  let service: CartService;
  let mockProductService: Partial<ProductService>;

  const mockProduct: Product = {
    name: 'Macaron Mix of Five',
    category: 'Macaron',
    price: 8.0,
    image: {
      thumbnail: 'images/image-macaron-thumbnail.jpg',
      mobile: 'images/image-macaron-mobile.jpg',
      tablet: 'images/image-macaron-tablet.jpg',
      desktop: 'images/image-macaron-desktop.jpg',
    },
  };

  beforeEach(() => {
    mockProductService = {
      getProduct: jest.fn((name: string) => {
        return name === mockProduct.name ? mockProduct : undefined;
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: ProductService, useValue: mockProductService },
      ],
    });

    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    service.addToCart(mockProduct.name);
    service.cart$.subscribe((cart) => {
      expect(cart.length).toBe(1);
      expect(cart[0].dessertName).toBe(mockProduct.name);
      expect(cart[0].quantity).toBe(1);
    });
  });

  it('should not add the same product twice', () => {
    service.addToCart(mockProduct.name);
    service.addToCart(mockProduct.name);
    service.cart$.subscribe((cart) => {
      expect(cart.length).toBe(1); // Still 1 item
    });
  });

  it('should increase quantity', () => {
    service.addToCart(mockProduct.name);
    service.quantityAction(mockProduct.name, 'INCREASE');
    service.cart$.subscribe((cart) => {
      expect(cart[0].quantity).toBe(2);
    });
  });

  it('should decrease quantity', () => {
    service.addToCart(mockProduct.name);
    service.quantityAction(mockProduct.name, 'INCREASE');
    service.quantityAction(mockProduct.name, 'DECREASE');
    service.cart$.subscribe((cart) => {
      expect(cart[0].quantity).toBe(1);
    });
  });

  it('should remove product from cart', () => {
    service.addToCart(mockProduct.name);
    service.removeFromCart(mockProduct.name);
    service.cart$.subscribe((cart) => {
      expect(cart.length).toBe(0);
    });
  });

  it('should calculate total', () => {
    service.addToCart(mockProduct.name);
    service.quantityAction(mockProduct.name, 'INCREASE'); // quantity = 2
    const total = service.getTotal();
    expect(total).toBe(16); // 2 * 8.0
  });
});
