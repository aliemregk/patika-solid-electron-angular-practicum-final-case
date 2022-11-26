import { Category } from './../models/category.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = API_URL + "/categories";

  /**
   * @param  {HttpClient} httpClient
   * HttpClient injection.
   */
  constructor(private readonly httpClient: HttpClient) { }

  /**
   * @returns Observable<Category[]>
   * Get request for all categories. 
   */
  public getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiUrl);
  }
}
