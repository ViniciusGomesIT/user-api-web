import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Interfaces
import { Token } from './interfaces/token';

// Services
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  currentToken: Token;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentToken.subscribe(x => this.currentToken = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
