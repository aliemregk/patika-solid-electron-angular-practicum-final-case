import { API_URL } from './../constants/constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private apiUrl = API_URL + "/photos";

  /**
   * @param  {HttpClient} httpClient
   * HttpClient injection.
   */
  constructor(private readonly httpClient: HttpClient) { }

  /**
   * @param  {number} productId
   * @returns Observable<Photo[]>
   * Get request for photos according to given product ID.
   */
  public getPhotosByProductId(productId: number): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.apiUrl + "?productId=" + productId);
  }
}
