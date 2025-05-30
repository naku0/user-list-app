import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShortUser, User} from '../model/user.model';

@Injectable({providedIn: "root"})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {
  }

  /**
   * Function to get all Users from database
   * returns jsom objects with id, name and email
   */

  getUsers(): Observable<ShortUser[]> {
    return this.http.get<ShortUser[]>(`${this.apiUrl}?_fields=id,name,email`);
  }

  getAllData(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  /**
   * Function to get specific user
   * @param id user's id
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }

  /**
   * Function to put new user into database
   * @param user json object: Omit<User,'id'>, with user info
   */
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  /**
   * Function to update user's information
   * @param id user's id that info getting updated
   * @param user json object: Partial<User>, new info about user
   */

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  /**
   * Function to delete user from database
   * @param id user's id
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
