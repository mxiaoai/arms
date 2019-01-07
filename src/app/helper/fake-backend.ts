import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  private cookieId: string = "SESSIONIDAptx4869";

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    // let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // wrap in delayed observable to simulate server api call
    return (
      of(null)
        .pipe(
          mergeMap(() => {
            let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZmlyc3ROYW1lIjoiU2hpcmxleSIsImxhc3ROYW1lIjoiTWEiLCJjaG5OYW1lIjoi5Li-5Liq5L6L5a2QIiwiZW1haWwiOiJteGlhb2FpQGRvbWFpbi5jb20iLCJjcmVhdGVkQnkiOiJBZG1pbiIsImNyZWF0ZWRPbiI6IjIwMTgtMTItMjAiLCJ1cGRhdGVkQnkiOiJBZG1pbiIsInVwZGF0ZWRPbiI6IjIwMTgtMTItMjEifQ.XLtWBWsxLlMwQAlAWuNVcrj8QiOPy2F58q4cpy_Pzec";

            if (request.url.endsWith('/rememberme/login') && request.method === 'POST') {
                // find if any user matches login credentials
                let body = JSON.parse(request.body);
                let responseBody = {};
                if (body.email === 'mxiaoai@domain.com' &&
                    body.password === '123456') {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    responseBody = {
                        flow: "remembermelogin",
                        id: 6,
                        status: "success",
                        firstName: "Shirley",
                        lastName: "Ma",
                        chnName: "举个例子",
                        email: "mxiaoai@domain.com",
                        createdBy: "Admin",
                        createdOn: "2018-12-20",
                        updatedBy: "Admin",
                        updatedOn: "2018-12-21",
                        token: token
                    };
                } else {
                    responseBody = {
                        status: "failure",
                        errorMessage: "Invalid username and/or password"
                        
                    };
                }
                // this.cookieService.set(this.cookieId, token);
                return of(new HttpResponse({ status: 200, body: responseBody }));
            }

            // authenticate
            if (request.url.endsWith("/login") && request.method === "POST") {
              // find if any user matches login credentials
              let body = JSON.parse(request.body);
              let responseBody = {};
              if (
                body.email === "mxiaoai@domain.com" &&
                body.password === "123456"
              ) {
                // if login details are valid return 200 OK with user details and fake jwt token
                responseBody = {
                  flow: "login",
                  id: 6,
                  status: "success",
                  firstName: "Shirley",
                  lastName: "Ma",
                  chnName: "举个例子",
                  email: "mxiaoai@domain.com",
                  createdBy: "Admin",
                  createdOn: "2018-12-20",
                  updatedBy: "Admin",
                  updatedOn: "2018-12-21"
                };
              } else {
                responseBody = {
                  status: "failure",
                  errorMessage: "Invalid username and/or password"
                };
              }
              return of(new HttpResponse({ status: 200, body: responseBody }));
            }

            if (
              request.url.endsWith("/checkemail") &&
              request.method === "POST"
            ) {
              let body = JSON.parse(request.body);
              let responseBody = {};
              if (body.email === "mxiaoai@domain.com") {
                responseBody = {
                  flow: "resetpw",
                  status: "success",
                  errorMessage: null,
                  email: "mxiaoai@domain.com",
                  password: null
                };
              } else {
                responseBody = {
                  flow: "resetpw",
                  status: "failure",
                  errorMessage: "Email does not exist",
                  email: null,
                  password: null
                };
              }
              return of(new HttpResponse({ status: 200, body: responseBody }));
            }

            if (request.url.endsWith("/resetpw") && request.method === "POST") {
              let responseBody = {
                flow: "resetpw",
                status: "success",
                errorMessage: null
              };

              return of(new HttpResponse({ status: 200, body: responseBody }));
            }

            if (
              request.url.endsWith("/register") &&
              request.method === "POST"
            ) {
              let responseBody = {};
              if (
                request.body.email === "test@testmail.com" ||
                request.body.email === "mxiaoai@domain.com"
              ) {
                responseBody = {
                  flow: "register",
                  status: "failure",
                  errorMessage: "User already exists"
                };
              } else {
                responseBody = {
                  flow: "register",
                  status: "success",
                  errorMessage: null
                };
              }
              return of(new HttpResponse({ status: 200, body: responseBody }));
            }

            // pass through any requests not handled above
            return next.handle(request);
          })
        )

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize())
    );
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
