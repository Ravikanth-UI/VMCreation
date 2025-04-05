import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VMCreationComponent } from './vm-creation/vm-creation.component';
import { CreatVmComponent } from './creat-vm/creat-vm.component';
import { ContinueComponent } from './continue/continue.component';
import { AuthGuardService } from './service/authguard/auth.guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
  { path: 'vm_creation', component: VMCreationComponent, canActivate: [AuthGuardService]},
  { path: 'vm_create', component: CreatVmComponent, canActivate: [AuthGuardService] },
 {path: 'continue', component: ContinueComponent, canActivate: [AuthGuardService] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
