import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData, CommonModule } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgxCurrencyModule } from "ngx-currency";

registerLocaleData(localeFr, 'fr');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceLoaderComponent } from './components/invoice-loader/invoice-loader.component';
import { ViewInvoicesComponent } from './components/view-invoices/view-invoices.component';
import { HeaderComponent } from './components/shares/header/header.component';
import { FooterComponent } from './components/shares/footer/footer.component';

const routes: Routes = [
  { path: 'invoice', component: InvoiceLoaderComponent },
  { path: 'view', component:  ViewInvoicesComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'invoice' }
];

@NgModule({
  declarations: [
    AppComponent,
    InvoiceLoaderComponent,
    ViewInvoicesComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash:true}),
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
