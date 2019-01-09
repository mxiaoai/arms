import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators
} from "@angular/forms";
import { User } from "../user.model";
import { CustomValidators } from "../../helper/customValidators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  contentTitle: string = "Create an Account";
  errorMessage: string = "";
  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;
  registerForm: FormGroup;
  submitted: boolean = false;
  user: User;
  firstName: AbstractControl;
  lastName: AbstractControl;
  chnName: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;
  email: AbstractControl;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.resetUser();
  }

  createForm() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
        chnName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]]
      },
      {
        validator: CustomValidators.matchPassword.bind(this)
      }
    );
    this.firstName = this.registerForm.controls.firstName;
    this.lastName = this.registerForm.controls.lastName;
    this.password = this.registerForm.controls.password;
    this.confirmPassword = this.registerForm.controls.confirmPassword;
    this.chnName = this.registerForm.controls.chnName;
    this.email = this.registerForm.controls.email;
  }

  resetUser() {
    this.user = {
      id: null,
      firstName: "",
      lastName: "",
      password: "",
      chnName: "",
      email: "",
      createdBy: null,
      createdOn: null,
      updatedBy: null,
      updatedOn: null
    };
  }

  /*
  resetForm(formGroup: FormGroup) {
    if (formGroup != null) {
      formGroup.reset();
    }
    this.resetUser();
  }
  */

  onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.user.firstName = this.firstName.value;
    this.user.lastName = this.lastName.value;
    this.user.password = this.password.value;
    this.user.chnName = this.chnName.value;
    this.user.email = this.email.value;
    this.creatNewAccount(this.user);
  }

  creatNewAccount(newUser: User) {
    const body = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      password: newUser.password,
      chnName: newUser.chnName,
      email: newUser.email,
      createdBy: newUser.createdBy,
      updatedBy: newUser.updatedBy
    };
    return this.http.post(this.registerUrl, body).subscribe(response => {
      // console.log(response);
      if (response && response["status"] === "failure") {
        this.errorMessage = response["errorMessage"];
      } else if (response && response["status"] === "success") {
        this.router.navigate(["/login"], {
          queryParams: { redirectFrom: "register" }
        });
      }
    });
  }
}
