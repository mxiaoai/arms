import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  errors: string;
  signinForm: FormGroup;
  submitted: boolean = false;
  email: AbstractControl;
  password: AbstractControl;
  title: string = "Login to Your Account";
  redirectFrom: string = undefined;
  rememberMe: AbstractControl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    // change title based on queryParams['redirectFrom']
    this.redirectFrom = this.route.snapshot.queryParams["redirectFrom"];
    // console.log(this.redirectFrom);
    this.changeTitle();
    this.route.queryParams.subscribe(data => {
      this.redirectFrom = data["redirectFrom"];
      // console.log(this.redirectFrom);
      this.changeTitle();
    });
  }

  changeTitle() {
    switch (this.redirectFrom) {
      case "resetpwd":
        this.title = "Login with Your New Password";
        break;
      case "register":
        this.title = "Login to Your Registered Account";
        break;
      default:
        this.title = "Login to Your Account";
    }
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        )
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      rememberMe: new FormControl(false)
    });
    this.email = this.signinForm.controls.email;
    this.password = this.signinForm.controls.password;
    this.rememberMe = this.signinForm.controls.rememberMe;
  }

  signIn() {
    this.submitted = true;

    // console.log(this.signinForm);
    if (this.signinForm.invalid) {
      return;
    }

    this.authService.login(this.signinForm.value).subscribe(res => {
      if (res) {
        //     let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
        //     this.router.navigate([returnUrl || "/home"]);
        this.router.navigate(["/"]);
      } else {
        this.invalidLogin = true;
      }
    });
  }

  onClear() {
    this.invalidLogin = false;
  }
}
