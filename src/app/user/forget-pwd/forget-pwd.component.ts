import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.scss']
})
export class ForgetPwdComponent implements OnInit {

  private email: string = '';
  private emailExist: boolean = true;
  private submitted: boolean = false;
  private url: string = '/checkemail';

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
  }

  submit(form: NgForm) {
    // console.log(form);
    this.submitted = true;
    if (form.invalid) return;

    this.authenticateEmail(form.value)
    .subscribe(res => {
      if (res) {
        console.log(this.email);
        this.router.navigate(["/resetpwd"], {queryParams: {email: this.email}});
      } else {
        this.emailExist = false;
      }
    });
  }

  authenticateEmail(form) {
    return this.http.post(this.url, JSON.stringify(form))
            .pipe(
              map(response => {
                if (response && response['status'] === 'success') {
                  // user exist
                  this.email = response['email'];
                  return true;
                }
                else {
                  return false;
                }
              },
            catchError((error) => {
              // it's important that we log an error here.
              // Otherwise you won't see an error in the console.
              console.error('error evaluating whether email valid', error);
              // loadingError$.next(true);
              return of();
            })));
  }

  onClear() {
    this.emailExist = true;
  }
}
