import { environment } from './../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: "root"
})
export class AuthService {
  private currentUser: User = null;
  private loginUrl: string = environment.loginUrl;
  private cookieId: string = environment.cookieId;
  private expiredTime: number = environment.cookieExpiredTime;
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private isRemembered: boolean = false;
  private localstorageKey: string = 'user';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }

  isLoggedIn() {
    if (this.currentUser)
      return true;
    else if (this.cookieService.get(this.cookieId)){
      this.currentUser = JSON.parse(localStorage.getItem(this.localstorageKey));
      return true;
    }
    return false;
  }

  getCurrentUser() {
    if (!this.currentUser) return null;
    return this.currentUser;
  }

  login(credentials) {
    this.isRemembered = credentials['rememberMe'];
    delete credentials.rememberMe;
    if (this.isRemembered)
      this.loginUrl = environment.remembermeLoginUrl;

    return this.http
    .post(this.loginUrl, JSON.stringify(credentials), this.httpOptions)
    .pipe(
      map(response => {
        // console.log(response);
        if (response && response["status"] === "success") {
          this.currentUser = new User(
            response["id"],
            response["email"],
            response["password"],
            response["firstName"],
            response["lastName"],
            response["chnName"],
            response["createdBy"],
            response["createdOn"],
            response["updatedBy"],
            response["updatedOn"]
          );
          if (this.isRemembered) {
            let expiredDate = new Date();
            expiredDate.setDate(expiredDate.getDate() + this.expiredTime);
            let token = response["token"];
            this.cookieService.set(this.cookieId, token, expiredDate);
            localStorage.setItem(this.localstorageKey, JSON.stringify(this.currentUser));
          }
          return true;
        } else {
          return false;
        }
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
    this.cookieService.delete(this.cookieId);
    localStorage.removeItem(this.localstorageKey);
    this.currentUser = null;
  }
}
