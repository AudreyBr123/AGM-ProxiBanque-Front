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

  // Récupération du statut dans le Store
  constructor(private store: Store<{status: string}>, private router: Router) {
    this.userStatusFromStore$ = store.select('status')
    this.userStatusFromStore$.subscribe((value: string) => this.userStatus$ = value )
  }

  /**
   * Au moment du logout, passage du rôle en "GUEST" dans le Store et dans le local Storage
   */
  handleLogout() {
    this.store.dispatch(setGuestStatus());
    localStorage.setItem('role', 'GUEST');
    this.router.navigate(['login'])
    }
}
