import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { of } from 'rxjs';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User = null;
  private loginUrl: string = "/login";

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    if(this.currentUser)
      return true;
    return false;
  }

  getCurrentUser() {
    if (!this.currentUser)
      return null;
    return this.currentUser;
  }

  login(credentials) {
    return this.http
    .post(this.loginUrl, JSON.stringify(credentials))
    // .post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(credentials))
    // .get("https://jsonplaceholder.typicode.com/users")
    .pipe(
      map(response => {
        // console.log(response);
        if (response && response["status"] === 'success') {
          this.currentUser = new User(response["id"], response["email"], 
              response["firstName"], response["lastName"], response["chnName"], 
              response["createdBy"], response["createdOn"],
              response["updatedBy"], response["updatedOn"]);
          return true;
        }
        return false;
      }),
      catchError((err) => {
        console.log('error', err);
        return of();
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  logout() {
    this.currentUser = null;
  }
}
