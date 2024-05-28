import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { init, setGuestStatus, setManagerStatus } from '../store/status.actions';
import { Observable } from 'rxjs';
import { selectStatus } from '../store/status.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

  export class HeaderComponent {

  userStatusFromStore$!: Observable<string>
  userStatus$ = ""

  constructor(private store: Store<{status: string}>, private router: Router) {
    this.userStatusFromStore$ = store.select('status')
    this.userStatusFromStore$.subscribe((value: string) => this.userStatus$ = value )
  }

  handleLogout() {
    this.store.dispatch(setGuestStatus());
    this.router.navigate(['login'])
    }

  handleLoginAsManager() {
    this.store.dispatch(setManagerStatus());
    }
}
