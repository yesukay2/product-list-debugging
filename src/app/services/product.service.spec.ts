import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../../app.module';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      name: "Waffle with Berries",
      category: "Waffle",
      price: 6.5,
      image: {
        thumbnail: "images/image-waffle-thumbnail.jpg",
        mobile: "images/image-waffle-mobile.jpg",
        tablet: "images/image-waffle-tablet.jpg",
        desktop: "images/image-waffle-desktop.jpg"
      }
    },
    {
      name: "Vanilla Bean Crème Brûlée",
      category: "Crème Brûlée",
      price: 7.0,
      image: {
        thumbnail: "images/image-creme-brulee-thumbnail.jpg",
        mobile: "images/image-creme-brulee-mobile.jpg",
        tablet: "images/image-creme-brulee-tablet.jpg",
        desktop: "images/image-creme-brulee-desktop.jpg"
      }
    }
    // You can add more items as needed for broader testing
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load all products from data.json', () => {
    service.product$.subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should return a specific product by name', () => {
    service['productsSubject'].next(mockProducts);
    const product = service.getProduct('Waffle with Berries');
    expect(product?.category).toBe('Waffle');
    expect(product?.price).toBe(6.5);
  });

  it('should return undefined if product does not exist', () => {
    service['productsSubject'].next(mockProducts);
    const product = service.getProduct('Nonexistent Dessert');
    expect(product).toBeUndefined();
  });
});
