import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { init } from '../store/status.actions';
import { Observable } from 'rxjs';
import { selectStatus } from '../store/status.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  //export class HeaderComponent implements OnInit {

  userStatus$!: Observable<string>

  constructor(private store: Store<{status: string}>) {
    this.userStatus$ = store.select('status')
  }
  
  handleClickOnInit() {
    this.store.dispatch(init());
    }

  // ngOnInit(): void {
  //   this.store.dispatch(init());
  //   this.userStatus$ = this.store.select(selectStatus)
  // }

}
