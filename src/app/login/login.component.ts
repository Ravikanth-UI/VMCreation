import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { setUser } from '../store/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  
  constructor(private router: Router, private authSer :AuthenticationService, private store: Store<AppState> ) { }
  ngOnInit(): void {

  }
  login() {
    if (this.username === 'admin' && this.password === 'admin') {
        this.authSer.login();
        this.router.navigate(['/vm_creation']);
        this.store.dispatch(setUser({ userName: 'Admin'}));
    } else {
      alert('Invalid username or password');
    }
  }
}
