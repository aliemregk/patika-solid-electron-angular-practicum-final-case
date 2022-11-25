import { CartService } from 'src/app/shared/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { API_URL } from '../constants/constants';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {

  private apiUrl = API_URL + "/products/";
  private subscription!: Subscription;

  /**
   * @param  {HttpClient} httpClient
   * @param  {CartService} cartService
   * Service and HttpClient injections.
   */
  constructor(
    private readonly httpClient: HttpClient,
    private readonly cartService: CartService
  ) { }

  /**
   * @returns void
   * Update product stock.
   */
  public updateProducts(): void {
    this.cartService.cartItems.forEach((item) => {
      const productToUpdate: Product = {
        id: item.product.id,
        name: item.product.name,
        unitPrice: item.product.unitPrice,
        description: item.product.description,
        coverImg: item.product.coverImg,
        categoryId: item.product.categoryId,
        stock: item.product.stock - item.quantity
      }
      this.subscription = this.updateProduct(productToUpdate).subscribe();
    });
  }

  /**
   * @returns Observable<Product[]>
   * Get request for all products.
   */
  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  /**
   * @param  {number} productId
   * @returns Observable<Product>
   * Get request for a single product according to given ID.
   */
  public getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(this.apiUrl + productId);
  }

  /**
   * @param  {Product} productToUpdate
   * @returns Observable<Product>
   * Put request for updating a product.
   */
  public updateProduct(productToUpdate: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.apiUrl + productToUpdate.id, productToUpdate);
  }

  /**
   * @returns void
   * Called once, before the instance is destroyed.
   * Unsubscription operation.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
