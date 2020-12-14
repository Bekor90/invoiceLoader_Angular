import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceLoaderComponent } from './components/invoice-loader/invoice-loader.component';
import{ ViewInvoicesComponent } from './components/view-invoices/view-invoices.component';

const routes: Routes = [
  { path: '', component: InvoiceLoaderComponent },
  { path: 'view', component:  ViewInvoicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
