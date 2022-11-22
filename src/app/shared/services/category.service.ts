import { Category } from './../models/category.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = Constants.API_URL + "/categories";

  constructor(private readonly httpClient: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiUrl);
  }
}
