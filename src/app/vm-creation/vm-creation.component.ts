import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { vmCreationType } from '../store/user.actions';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-vm-creation',
  templateUrl: './vm-creation.component.html',
  styleUrls: ['./vm-creation.component.scss']
})
export class VMCreationComponent implements OnInit {
  isLasOpen: boolean = false;
  isAtlOpen: boolean = false;
  vmForm: UntypedFormGroup;
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.router.navigate(['/vm_creation'])
  }
  constructor(private router: Router, public fb: FormBuilder, private store: Store<AppState> ) {
    this.vmForm = this.fb.group({
      las: [''],
      atl:['']
    })
   }
  ngOnInit(): void {
   
  }
  openLasSubmenu(): void {
    this.isLasOpen = true;
    this.isAtlOpen = false;
  }
  openAtlSubmenu(): void {
    this.isLasOpen = false;
    this.isAtlOpen = true;
  }
  vmCreate(): void{
   
    const option = this.vmForm.value.atl ? this.vmForm.value.atl : this.vmForm.value.las;
    this.store.dispatch(vmCreationType({ optionType: option}));
    this.router.navigate(['/vm_create']);
  }

  
}
