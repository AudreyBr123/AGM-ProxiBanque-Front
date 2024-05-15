import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup;
  email: FormControl;
  password: FormControl;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      'email': this.emailFormControl,
      'password': this.passwordFormControl
    });
    this.email = this.loginForm.controls['email'] as FormControl;
    this.password = this.loginForm.controls['password'] as FormControl;
  }

  onSubmit(value:string): void {
    // if(this.matcher =)
    console.log('Your order has been submitted : ', value);
  }
}
