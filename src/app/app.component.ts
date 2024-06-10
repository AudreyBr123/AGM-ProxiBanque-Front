import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setAdvisorStatus, setGuestStatus, setManagerStatus } from './store/status.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'AGM-ProxiBanque-Front';

  constructor(private store: Store<{status: string}>) {}

  // Au démarrage de l'application...
  ngOnInit(): void {
    // On vérifie si le localStorage contient une information concernant le role
    if (localStorage.getItem('role') != null) {
      // Si c'est le cas, on la met dans le store
      if (localStorage.getItem('role') == 'MANAGER') {
        this.store.dispatch(setManagerStatus());
      }

      if (localStorage.getItem('role') == 'ADVISOR') {
        this.store.dispatch(setAdvisorStatus());
      }

    } else {
      // Sinon, on indique au store le statut "GUEST"
      this.store.dispatch(setGuestStatus());
    }
  }
}
