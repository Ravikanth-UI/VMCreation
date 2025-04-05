import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Papa } from 'ngx-papaparse';
import { CsvName } from '../store/app.state';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ShareService } from '../service/sharee/share.service';

@Component({
  selector: 'app-continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.scss']
})
export class ContinueComponent implements OnInit {
  csvName: string | undefined ;
  gimRelease: string[] = [];
  selectedFile: any;
  vcenter: any;
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.router.navigate(['/vm_creation'])
  }
  continueForm: UntypedFormGroup | any;
  constructor(private router: Router, private papa: Papa, private store: Store<{names: CsvName}>, public fb: FormBuilder, public shareService: ShareService) {
    this.store.select('names').subscribe((res:any) => {
      const name = res.name.split('@');
      this.vcenter = name[1]
      this.csvName = name[0]
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.gimRelease = ['TPL_OL87_v2023Q1']
  }

  createForm(): void{
    this.continueForm = this.fb.group({
      scriptName: ['./deployvm.sh'],
      fileName: [this.csvName],
      vCenter:[this.vcenter],
      location:['loc-las'],
      gimRelease:['TPL_OL87_v2023Q1', 'TPL_Windows_2019_GUI_011412021']
    })
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = event.target.files[0];

    if (file) {
      this.parseCSV(file);
    }
  }

  parseCSV(file: File): void {
    this.papa.parse(file, {
      complete: (result) => {
        // Process the CSV data
        console.log('Parsed CSV result:', result.data);
        // Here, you can send the parsed data to your server or perform other actions
      },
      header: true, // Set to true if your CSV has a header row
    });
  }
  save(): void{
    const values = Object.values(this.continueForm.value);
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('additionalField', JSON.stringify(values));
    this.shareService.submitForm(values).subscribe(res => {
      const dd = res
    })
  }
}
