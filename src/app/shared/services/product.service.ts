import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/constants';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = API_URL + "/products/";

  /**
   * @param  {HttpClient} httpClient
   * HttpClient injection for requests.
   */
  constructor(private readonly httpClient: HttpClient) { }

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
    return this.httpClient.put<Product>(this.apiUrl, productToUpdate);
  }
}
