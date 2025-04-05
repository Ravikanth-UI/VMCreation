import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: any;
  constructor(private store: Store<{names: AppState}>, private route : Router, private authSer :AuthenticationService,) {
   
  }
  ngOnInit(): void {
    this.store.select('names').subscribe((res:any) => {
      this.userName = res?.userName;
    });
   
  }
  logOut(): void{
    this.authSer.logout();
    this.route.navigate(['/login'])
  }
  
    // this.store.select('user').subscribe((userName: string | null) => {
    //   this.userName = userName;
    // });
  
 
}
