import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { UserModel } from '../models/user.model';
import { setAdvisorStatus, setGuestStatus, setManagerStatus } from '../store/status.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../styles.css'],
})
export class LoginComponent {
  loginForm : FormGroup;
  email: FormControl;
  password: FormControl;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  invalidCredentials = false;

  constructor(formBuilder: FormBuilder, private service: LoginService, private store: Store<{status: string}>, private router: Router) {
    this.loginForm = formBuilder.group({
      'email': this.emailFormControl,
      'password': this.passwordFormControl
    });
    this.email = this.loginForm.controls['email'] as FormControl;
    this.password = this.loginForm.controls['password'] as FormControl;
  }

  onSubmit(value:string): void {    
    const user = new UserModel(this.email.value, this.password.value)

    //On recupere la reponse du back-end au submit du formulaire de connexion
    //Si le role renvoye est manager ou advisor, on definit le statut de l'utilisateur a manager ou advisor dans le store (et on redirige)
    //Sinon, on definit a GUEST (et on reste sur la page login)
    this.service.postLogin(user).subscribe(
      value => {
        // Au moment du login, on n'oublie pas de mettre le role à la fois dans le store et dans le localStorage
        // Eviter de se déconnecter à chaque refresh
        if (value.role === 'MANAGER') {
          this.store.dispatch(setManagerStatus())
          localStorage.setItem('role', 'MANAGER')
          this.router.navigate(['client-list'])

        } else if (value.role === 'ADVISOR') {
          this.store.dispatch(setAdvisorStatus())
          localStorage.setItem('role', 'ADVISOR')
          this.router.navigate(['client-list'])

        } else {
          this.store.dispatch(setGuestStatus())
          this.emailFormControl.setErrors({ incorrectEmail: true });
          this.passwordFormControl.setErrors({ incorrectPassword: true });
          this.invalidCredentials = true;
        }
  })
  }
}
