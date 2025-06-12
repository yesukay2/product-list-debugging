import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../app.module';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {
    this.loadAllProducts();
  }

  private productsSubject = new BehaviorSubject<Product[]>([]);
  public product$: Observable<Product[]> = this.productsSubject.asObservable();
  private dataUrl = 'data.json';

  loadAllProducts(): void {
    this.http.get<Product[]>(this.dataUrl).subscribe({
      next: (data) => {
        this.productsSubject.next(data);
      },
      error: (error) => {
        console.error('Error loading invoices:', error);
      },
    });
  }

  getProduct(name: string): Product | undefined {
    const products = this.productsSubject.getValue();
    return products.find((product) => product.name === name);
  }
}
