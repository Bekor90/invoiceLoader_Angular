import { Injectable } from '@angular/core';
import { Invoice } from '../class/invoice';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  arrayValues:Invoice[]=[];

  constructor(private http: HttpClient) { }

  private HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  private url = `${environment.apiUrl}/invoice`;

  create(invoice: any) : Observable<any> {  
    return this.http.post<any>(this.url, invoice, {headers: this.HttpHeaders});
  } 

  getInvoice(filters:any){
    return this.http.post<any>(`${this.url}/filters`, filters, {headers: this.HttpHeaders}).pipe(
      map(response => response)
    );
  }
  
  delete(){
    let deleteUrl = `${this.url}`;
    return this.http.delete(deleteUrl, {headers: this.HttpHeaders});
  }

  deleteBy(id_invoice:number){
    let deleteUrl = `${this.url}/${id_invoice}`;
    return this.http.delete(deleteUrl, {headers: this.HttpHeaders});
  }

  getWeather(lat:string, lon:string): Observable<any>{
    let weatherUrl = `${environment.apiUrl}/weather`;
      return this.http.get(`${weatherUrl}/${lat}/${lon}`, {headers: this.HttpHeaders}).pipe(
        map(response => response)
      );
  }

  saveDataLocalStorageInvoice(data: Invoice[] ) : void{
    this.arrayValues = data;
    localStorage.setItem('data', JSON.stringify(data));
  }

  getDataLocalStorageInvoice() : Invoice[]{
    if(localStorage.getItem('data')){
     let data = localStorage.getItem('data');
     this.arrayValues = JSON.parse(data);
    }else{
      this.arrayValues=[];
    }
    return  this.arrayValues;
  }

  cleanDataLocalStorage(): void{
    localStorage.clear();
  }

}
