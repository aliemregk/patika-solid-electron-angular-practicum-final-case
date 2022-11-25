import { Observable } from 'rxjs';
import { API_URL } from './../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = API_URL + "/users";

  /**
   * @param  {HttpClient} httpClient
   * HttpClient injection.
   */
  constructor(private readonly httpClient: HttpClient) { }

  /**
  * @param  {string} email
  * @returns Observable<User>
  * Get request for a single user according to given email. 
  */
  public getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + "?email=" + email);
  }

  /**
   * @param  {User} user
   * @returns Observable<User>
   * Post request for adding a new user.
   */
  public addNewUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user);
  }
}
