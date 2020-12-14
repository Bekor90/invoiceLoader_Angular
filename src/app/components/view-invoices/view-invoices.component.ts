import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { InvoiceService } from '../../services/invoice.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css']
})
export class ViewInvoicesComponent implements OnInit {

  arrayValues:any[]=[];
  totalNet:number=0;
  totalTax:number=0;
  total:number=0;
  invoice:any={};
  invoiceNumber:number;
  dateI:Date;
  dateF:Date;

  constructor( private router: Router,
    private serviceInvoice:InvoiceService) { }

  ngOnInit(): void {
    this.fnGetInvoice();
   
  }

  fnGetInvoice(filters?:any){
    this.serviceInvoice.getInvoice(filters).subscribe( response =>{
      console.log('filtros: ',filters);
      console.log('response: ',response);
      if(response.ok){
        response.data.map((data) => {
          try{
            this.totalNet += +data.Net;
            this.totalTax += +data.Tax;
            this.total += +data.Total;

            let obj = {
              created: data.date,
              invoiceNumber: +data.InvoiceNumber,
              net: +data.Net,
              tax: +data.Tax,
              total: +data.Total
            }
  
            this.arrayValues.push(obj);
          }catch (error) {
              console.log('error the api data has been modified');
          }
        });
      }
   });
  }

  fnFindInvoice(){
    let dateFormatI = moment(this.dateI).format("YYYY-MM-DD");
    let dateFormatF = moment(this.dateF).format("YYYY-MM-DD");

    console.log(this.invoiceNumber);
    console.log(dateFormatI);
    console.log(dateFormatF);

    this.arrayValues=[];
    this.totalNet = 0;
    this.totalTax = 0;
    this.total = 0;
    let filters={
      invoiceNumber: this.invoiceNumber+'',
      dateIni: dateFormatI,
      dateFin: dateFormatF
    }

    this.fnGetInvoice(filters);
  }

  fnDeleteData(){
    Swal.fire({
      title: 'Delete data',
      text: 'Are you sure to delete the data?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Accept',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if(result.value) {

        this.serviceInvoice.delete().subscribe(response => {
          this.arrayValues =[];
          this.totalNet = 0;
          this.totalTax = 0;
          this.total = 0;
        });
      }else if (result.dismiss === Swal.DismissReason.cancel) {
       
      }
    });
  }

  cleanFind(){
    this.fnGetInvoice();
  }

  backView(){
    this.router.navigate(['invoice']);
  }

}
