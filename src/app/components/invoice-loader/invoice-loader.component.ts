import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { Invoice } from '../../class/invoice';
import { InvoiceService } from '../../services/invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-loader',
  templateUrl: './invoice-loader.component.html',
  styleUrls: ['./invoice-loader.component.css']
})
export class InvoiceLoaderComponent implements OnInit {

 public invoiceForm: FormGroup;
 clear:boolean=true;
 invoice:Invoice;
 arrayValues:Invoice[]=[];

  constructor(private formBuilder: FormBuilder, private serviceInvoice:InvoiceService,
              private router: Router ) { }

  ngOnInit(): void {
    this.invoiceForm = this.formBuilder.group({
      invoiceNumber: ['', Validators.required],
      net: ['', Validators.required],
      tax: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      taxPercent: '',
      total: '',
      Rows: this.formBuilder.array([])
    });
    this.invoice = new Invoice();
   this.arrayValues = this.serviceInvoice.getDataLocalStorageInvoice();
  }


  addNewRow(): void{

   if(this.invoiceForm.controls['tax'].value >= 0){
      this.invoice.invoiceNumber = this.invoiceForm.controls['invoiceNumber'].value;
      this.invoice.net = this.invoiceForm.controls['net'].value;
      this.invoice.tax = this.invoiceForm.controls['tax'].value;
      this.invoice.taxPercentage = this.invoiceForm.controls['taxPercent'].value;
      this.invoice.total = this.invoiceForm.controls['total'].value;
      this.arrayValues.push(this.invoice);
      this.serviceInvoice.saveDataLocalStorageInvoice(this.arrayValues);
      this.invoice = new Invoice();
      this.cleanFields();
    }else{
      Swal.fire({
        title: 'Illegal value',
        text: 'Validate the % Tax must be greater than or equal to 0',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK',
      });
    }
  }

  deleteRow(index: number): void {
    this.arrayValues.splice(index, 1);
    this.serviceInvoice.saveDataLocalStorageInvoice(this.arrayValues);
  }

  cleanRow(): void{
    this.arrayValues=[];
    this.serviceInvoice.cleanDataLocalStorage();
  }

  cleanFields(): void{
    this.invoiceForm.patchValue({
      invoiceNumber: '',
      net: '',
      tax: '',
      total: ''
    });
  }

  calculateTotal(): void{

    let tax = this.invoiceForm.controls['tax'].value;
    let net = this.invoiceForm.controls['net'].value;
    let tempTotal=0;
    let tempPercent=0;

      if(tax!=null){
        tempTotal = net * (1 + tax /100);
        tempPercent = ((net * tax) /100);
        this.invoiceForm.patchValue({
          total: tempTotal,
          taxPercent: tempPercent+''
        });
      }else{
        this.invoiceForm.patchValue({
          total: tempTotal+''
        });
      }
  }

  process(){

    let dataRequest ={
      data : this.arrayValues
    }
    this.serviceInvoice.create(dataRequest).subscribe(response => {
      if(response.ok){
        Swal.fire({
          title: 'Successfully processed!',
          text: 'Do you want to see stored data?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'View',
          cancelButtonText: 'New'
        }).then((result) => {
          if(result.value) {
            this.cleanRow();
            this.router.navigate(['view']);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.cleanRow();
          }
        });

      }else{
        Swal.fire({
          title: 'Ups problem saving data!',
          text: 'Validate sent data',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
        });
      }
    }, err => {
      Swal.fire({
        title: 'Ups problem saving data!',
        text: 'Check your internet connection',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK',
      });
    });
  }


}
