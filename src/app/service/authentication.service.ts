import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
private isAuthenticated = false;
  constructor() { }

  login(): void{
    this.isAuthenticated = true;
  }
  logout(): void{
    this.isAuthenticated = false;
  }
  isAuthenticateUser(): boolean{
    return this.isAuthenticated;
  }
}
