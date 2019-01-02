import { HttpClient } from "@angular/common/http";
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-reset-pwd",
  templateUrl: "./reset-pwd.component.html",
  styleUrls: ["./reset-pwd.component.scss"]
})
export class ResetPwdComponent implements OnInit {
  private emailStr: string;
  private email: AbstractControl;
  private resetForm: FormGroup;
  private password: AbstractControl;
  private confirmpassword: AbstractControl;
  private submitted: boolean = false;
  private invalidReset: boolean = false;
  // private resetSucc: boolean = false;
  private url: string = "/resetpw";

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetForm = this.formBuilder.group(
      {
        email: ["123"],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmpassword: ["", Validators.required]
      },
      {
        validator: this.matchPassword.bind(this)
      }
    );
    this.email = this.resetForm.controls.email;
    this.password = this.resetForm.controls.password;
    this.confirmpassword = this.resetForm.controls.confirmpassword;
  }

  ngOnInit() {
    this.emailStr = this.route.snapshot.queryParams["email"];
    this.email.setValue(this.emailStr);
    this.route.queryParams.subscribe(data => {
      this.emailStr = data["email"];
      this.email.setValue(this.emailStr);
    });
  }

  matchPassword(control: AbstractControl) {
    let password = control.get("password").value;
    let confirmpassword = control.get("confirmpassword").value;
    if (password !== confirmpassword) {
      control.get("confirmpassword").setErrors({ passwordnotmatch: true });
      return { passwordnotmatch: true };
    } else {
      return null;
    }
  }

  reset() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    if (this.emailStr == null || this.emailStr == "") {
      this.invalidReset = true;
      return;
    }

    let body = this.resetForm.value;
    delete body.confirmpassword;
    console.log(body);
    this.resetPwd(JSON.stringify(body)).subscribe(res => {
      if (res) {
        this.invalidReset = false;
        // this.resetSucc = true;
        this.router.navigate(["/login"], {
          queryParams: { redirectFrom: "resetpwd" }
        });
      }
    });
  }

  resetPwd(body: string) {
    return this.http.post(this.url, body).pipe(
      map(
        response => {
          if (response && response["status"] === "success") {
            return true;
          } else {
            return false;
          }
        },
        catchError(error => {
          // it's important that we log an error here.
          // Otherwise you won't see an error in the console.
          console.error("error resetting password", error);
          // loadingError$.next(true);
          return of();
        })
      )
    );
  }
}
