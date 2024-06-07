import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {setGuestStatus } from '../store/status.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../styles.css'],
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
    localStorage.setItem('role', 'GUEST');
    this.router.navigate(['login'])
    }
}
