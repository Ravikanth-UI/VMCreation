import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VMCreationComponent } from './vm-creation/vm-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatVmComponent } from './creat-vm/creat-vm.component';
import { ContinueComponent } from './continue/continue.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StoreModule } from '@ngrx/store';
import addName from './store/user.reducer';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VMCreationComponent,
    CreatVmComponent,
    ContinueComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    StoreModule.forRoot({ names : addName}),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
