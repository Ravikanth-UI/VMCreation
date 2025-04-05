import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, OptionType } from '../store/app.state';
import { csvName } from '../store/user.actions';
import { ShareService } from '../service/sharee/share.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-creat-vm',
  templateUrl: './creat-vm.component.html',
  styleUrls: ['./creat-vm.component.scss']
})

export class CreatVmComponent {
  
  vmCreation: UntypedFormGroup | any;
  tmPlate: { name: string; desc: string; }[] = [];
  resourcePool: { name: string; desc: string; }[] = [];
  cpuData: number[] = [];
  ramData: number[] = [];
  diskData2: number[] = [];
  optyonType: string = '';
  vcenter: string = '';
  dataCenter: string = '';
  pdns: string = '';
  sdns: string = '';
  isLoading: boolean = false;
  datastore: any;

  constructor(private router: Router, public fb: FormBuilder, private store: Store<{ names: OptionType }>, public shareService : ShareService) {
    this.store.select('names').subscribe((res: any) => {
      switch (res.optionType) {
        case 'las_app':
          this.vcenter = 'las_app';
          this.dataCenter = "data center las_app";
          this.pdns = '10.82.2.137';
          this.sdns = '10.88.16.9';
          this.resourcePool = [
            {
              name: 'TE03-CL1',
              desc: 'TE03-CL1'
            },
            {
              name: 'TE03-CL2',
              desc: 'TE03-CL2'
            },
            {
              name: 'TE03-CL3',
              desc: 'TE03-CL3'
            }
          ]
          break;
        case 'las_oracle':
          this.vcenter = '';
          this.dataCenter = "";
          this.pdns = '10.82.2.137';
          this.sdns = '10.88.16.9';
          this.resourcePool = [
            {
              name: 'TE03-CL1',
              desc: 'TE03-CL1'
            },
            {
              name: 'TE03-CL2',
              desc: 'TE03-CL2'
            },
            {
              name: 'TE03-CL3',
              desc: 'TE03-CL3'
            }
          ]
          break;
        case 'atl_app':
          this.vcenter = '';
          this.dataCenter = "";
          this.pdns = '10.88.16.9';
          this.sdns = '10.82.2.137';
          this.resourcePool = [
            {
              name: 'TE03-CL1',
              desc: 'TE03-CL1'
            },
            {
              name: 'TE03-CL2',
              desc: 'TE03-CL2'
            },
            {
              name: 'TE03-CL3',
              desc: 'TE03-CL3'
            }
          ]
          break;
        case 'atl_oracle':
          this.vcenter = '';
          this.dataCenter = "";
          this.pdns = '10.88.16.9';
          this.sdns = '10.82.2.137';
          this.resourcePool = [
            {
              name: 'TE03-CL1',
              desc: 'TE03-CL1'
            },
            {
              name: 'TE03-CL2',
              desc: 'TE03-CL2'
            },
            {
              name: 'TE03-CL3',
              desc: 'TE03-CL3'
            }
          ]
          break;
        case 'atl_te03':
          this.vcenter = 'atlssnte03vcn70.atl.ssnsgs.net';
          this.dataCenter = "ATL-TE03";
          this.pdns = '10.88.16.9';
          this.sdns = '10.82.2.137';
          this.resourcePool = [
            {
              name: 'TE03-CL1',
              desc: 'TE03-CL1'
            },
            {
              name: 'TE03-CL2',
              desc: 'TE03-CL2'
            },
            {
              name: 'TE03-CL3',
              desc: 'TE03-CL3'
            }
          ]
          break;
        default:
          this.vcenter = '';
          this.dataCenter = "";
          this.pdns = '';
          this.sdns = '';
          this.resourcePool = []
          break
      }
    });
  }
  ngOnInit(): void {
    this.cpuData = [2, 4, 8, 16, 32];
    this.ramData = [2, 4, 8, 16, 32];
    this.diskData2 = [300, 400]
    this.tmPlate = [
      {
        name: 'TPL_OL87_v2023Q1.1',
        desc: 'TPL_OL87_v2023Q1.1'
      },
      {
        name: 'TPL_Windows_2019_GUI_011412021',
        desc: 'TPL_Windows_2019_GUI_011412021'
      }
    ];

    this.vmCreation = this.fb.group({
      vm_config: this.fb.array([])
    });
    this.addRecord();

  }

  containsNumber(str: any): any {
    return /^\d+$/.test(str);
  }
  cancel(): void {
    this.router.navigate(['/vm_creation']);
  }

  addRecord(): void {
    const values = (<UntypedFormArray>this.vmCreation.get('vm_config')).controls[0]?.value;
    const vmConfigArray = (<UntypedFormArray>this.vmCreation.get('vm_config'));
    // vmConfigArray.setValidators(this.shareService.networkUniqueValidator);
    // vmConfigArray.updateValueAndValidity();
    const lastIndex = vmConfigArray.length - 1;
    const lastControl = vmConfigArray.at(lastIndex);

    const temp = this.fb.group({
      Name: [lastControl && lastControl.value?.Name ? this.containsNumber(lastControl.value.Name.slice(-2)) ? lastControl.value.Name.slice(0, -2) + String((Number(lastControl.value.Name.slice(-2)) + 1)).toString().padStart(lastControl.value.Name.slice(-2).length, '0') : '' : '', [Validators.required]],
      _new_fqdn: [''],
      Vcenter: [this.vcenter],
      Datacenter: [this.dataCenter],
      Folder: [''],
      Template: [values?.Template ? values.Template : '', [Validators.required]],
      ResourcePool: [values?.ResourcePool ? values.ResourcePool : '', [Validators.required]],
      CPU: ['', [Validators.required]],
      RAM: ['', [Validators.required]],
      DISK2: ['', [Validators.required]],
      Datastore: [values?.Datastore ? values.Datastore : '', [Validators.required]],
      Network: [values?.Network ? values.Network : '', [Validators.required]],
      IPAddress: ['', [Validators.required]],
      SubnetMask: [values?.SubnetMask ? values.SubnetMask : '', [Validators.required]],
      Gateway: [values?.Gateway ? values.Gateway : '', [Validators.required]],
      pDNS: [this.pdns],
      sDNS: [this.sdns],
      Notes: [values?.Notes ? values.Notes : '', [Validators.required]]
    });
    const notificationAction = <UntypedFormArray>this.vmCreation.get('vm_config');
    notificationAction.push(temp);
    
  }
  clearSubnetmask(i: number): void{
    this.vmCreation.get('vm_config').at(i).get('SubnetMask').setValue();
    this.vmCreation.get('vm_config').at(i).get('Gateway').setValue();
  }
  checkDuplicate(control: AbstractControl, i: number): void {
    const networkValue = control.value;
    if (this.isDuplicate(networkValue)) {
      alert('Please enter a unique ipAddress value');
      this.vmCreation.get('vm_config').at(i).get('IPAddress').setValue();
    } else {
      control.setErrors(null);
    }
  }
  isDuplicate(array: any) {
    const val = this.vmCreation.get('vm_config')?.value
    return val.length > 1 ? val.filter((obj: any) => obj.IPAddress === array.IPAddress).length > 1 ? true : null: null;
    };
 
  
  submit(): void {
    this.isLoading = true;
    this.downloadCSV();
    this.downloadCustomCsv();
  }

  get formArray(): FormArray {
    return this.vmCreation.get('vm_config') as FormArray;
  }

  convertToCSV(): string {
    const header = Object.keys(this.formArray.at(0).value);
    const rows = this.formArray.controls.map(control =>
      Object.values(control.value).map(value => this.escapeCsvValue(value)).join(',')
    );
    return [header, ...rows].join('\n');
  }
  escapeCsvValue(value: any): string {
    if (value && value.toString().includes(',')) {
      return `"${value}"`;
    }
    return value;
  }
  downloadCustomCsv(): void {
    this.getCsvFile(false);
  }
  downloadCSV(): void {
    this.getCsvFile(true);
  }
  getCsvFile(type: boolean): void {
    const csvData = type ? this.convertToCSV() : this.customCsv();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const extName = this.formArray.value[0].Notes;
    const fileName = type ? `Deployevm_${extName}.csv` : `DNS_Hostrecords_${extName}.csv`;
    this.store.dispatch(csvName({ name: `Deployevm_${extName}@${this.vcenter}.csv`}));
    const link = document.createElement('a');
    const formData: FormData = new FormData();
    if (link.download !== undefined) {
    
      formData.append('file', blob, fileName);
      this.shareService.uploadCsv(formData).subscribe(res => {
        const dd = res
        this.isLoading = false;
      })
    } else {
      console.error('Your browser does not support the download attribute.');
    }
    if(!type){
      setTimeout(() =>{
        this.router.navigate(['/continue']);
      }, 1000)
    }
  }
 

  customCsv(): any {
    const customHeaders = ['header-hostrecord', 'fqdn*', '_new_fqdn', 'addresses', 'aliases', 'comment', 'configure_for_dns', '_new_configure_for_dns', 'disabled', 'enable_discovery', 'enable_immediate_discovery', 'ipv6_addresses', 'network_view', 'override_credential', 'snmpv1v2_credential', 'snmpv3_credential', 'ttl', 'use_snmpv3_credential', 'view'];
    const rows = this.formArray.value.map((res: any) => {
      return Object.values({
        ['header-hostrecord']: 'hostrecord',
        ['fqdn']: res.Name +'.'+ res.Vcenter.substring(res.Vcenter.indexOf('.') + 1),
        ['_new_fqdn']: '',
        ['addresses']: res.IPAddress,
        ['aliases']: '',
        ['comment']: res.Notes,
        ['configure_for_dns']: 'TRUE',
        ['_new_configure_for_dns']: '',
        ['disabled']: 'FALSE',
        ['enable_discovery']: 'TRUE',
        ['enable_immediate_discovery']: 'FALSE',
        ['ipv6_addresses']: '',
        ['network_view']: 'default',
        ['override_credential']: 'FALSE',
        ['snmpv1v2_credential']: '',
        ['snmpv3_credential']: '',
        ['ttl']: '',
        ['use_snmpv3_credential']: 'FALSE',
        ['view']: 'Internal DNS'
      });
    });
    const header = customHeaders.join(',');
    return [header, ...rows].join('\n');
  }

  delete(i: number): void {
    this.vmCreation.get('vm_config').removeAt(i);
  }
  resourcePoolChange(ev: any, i: number): void{
    this.vmCreation.get('vm_config').at(i).get('Datastore').setValue('')
    this.datastore = [];
    this.shareService.getTodos().subscribe(res => {
      this.datastore =  res.filter(data => ev.target.value === data.cluster).map(space => ({
        id: space.datastore,
        name: space.datastore + '(' + space.free_space_TB + '/' + space.total_size_TB + ')'
    }));
 
    })
  }
}
