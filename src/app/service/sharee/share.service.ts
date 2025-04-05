import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private res = [
    {
      "cluster": "TE03-CL1", 
      "datastore": "PUR-TE03-Data01", 
      "free_space_TB": 2.24, 
      "total_size_TB": 4.0
    }, 
    {
      "cluster": "TE03-CL1", 
      "datastore": "PUR-TE03-Data02", 
      "free_space_TB": 2.92, 
      "total_size_TB": 4.0
    }, 
    {
      "cluster": "TE03-CL1", 
      "datastore": "datastore1", 
      "free_space_TB": 0.0, 
      "total_size_TB": 0.0
    }, 
    {
      "cluster": "TE03-CL1", 
      "datastore": "PUR-TE03-DATA11", 
      "free_space_TB": 13.88, 
      "total_size_TB": 16.0
    }, 
    {
      "cluster": "TE03-CL1", 
      "datastore": "PUR-TE03-DATA12", 
      "free_space_TB": 12.78, 
      "total_size_TB": 16.0
    }, 
    {
      "cluster": "TE03-CL1", 
      "datastore": "datastore1 (1)", 
      "free_space_TB": 0.0, 
      "total_size_TB": 0.0
    }, 
    {
      "cluster": "TE03-CL1", 
      "datastore": "datastore1 (2)", 
      "free_space_TB": 0.0, 
      "total_size_TB": 0.0
    }, 
    {
      "cluster": "TE03-CL2", 
      "datastore": "atlssnte03esx04-datastore1", 
      "free_space_TB": 0.1, 
      "total_size_TB": 0.1
    }, 
    {
      "cluster": "TE03-CL2", 
      "datastore": "atlssnte03esx04-datastore2", 
      "free_space_TB": 35.33, 
      "total_size_TB": 36.38
    }, 
    {
      "cluster": "TE03-CL2", 
      "datastore": "atlssnte03esx05-datastore1", 
      "free_space_TB": 0.1, 
      "total_size_TB": 0.1
    }, 
    {
      "cluster": "TE03-CL2", 
      "datastore": "atlssnte03esx05-datastore2", 
      "free_space_TB": 36.38, 
      "total_size_TB": 36.38
    }, 
    {
      "cluster": "TE03-CL3", 
      "datastore": "PUR-TE03-Data01", 
      "free_space_TB": 2.24, 
      "total_size_TB": 4.0
    }, 
    {
      "cluster": "TE03-CL3", 
      "datastore": "PUR-TE03-Data02", 
      "free_space_TB": 2.92, 
      "total_size_TB": 4.0
    }, 
    {
      "cluster": "TE03-CL3", 
      "datastore": "datastore1 (4)", 
      "free_space_TB": 0.42, 
      "total_size_TB": 0.43
    }, 
    {
      "cluster": "TE03-CL3", 
      "datastore": "PUR-TE03-DATA11", 
      "free_space_TB": 13.88, 
      "total_size_TB": 16.0
    }, 
    {
      "cluster": "TE03-CL3", 
      "datastore": "PUR-TE03-DATA12", 
      "free_space_TB": 12.78, 
      "total_size_TB": 16.0
    }, 
    {
      "cluster": "TE03-CL3", 
      "datastore": "datastore1 (3)", 
      "free_space_TB": 0.31, 
      "total_size_TB": 0.31
    }
  ]

  constructor(private http: HttpClient) { }

  getTodos(): Observable<any[]> {
    return of(this.res);
   // return this.http.get<any[]>(this.apiUrl);
  }

  submitForm(data: any): Observable<any>{
    const baseUrl = 'http://localhost:3000/submit-form'
    return this.http.post(baseUrl, data);
  }
  uploadCsv(file: any): Observable<any>{
    const baseUrl = 'http://localhost:3000/uploadCsv'
    return this.http.post(baseUrl, file);
  }


}
