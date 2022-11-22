import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants/constants';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = Constants.API_URL + "/products/";

  constructor(private readonly httpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(this.apiUrl + productId);
  }

  updateProduct(productToUpdate: Product): Observable<Product> {
    console.log("service", productToUpdate);
    return this.httpClient.put<Product>(this.apiUrl, productToUpdate);
  }
}
