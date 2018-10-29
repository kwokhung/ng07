import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExportListComponent } from './components/export-list/export-list.component';
import { DuplicateInvoiceComponent } from './components/duplicate-invoice/duplicate-invoice.component';
import { ExpenseToBeExportedComponent } from './components/expense-to-be-exported/expense-to-be-exported.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'export-list', component: ExportListComponent },
  { path: 'duplicate-invoice', component: DuplicateInvoiceComponent },
  { path: 'expense-to-be-exported', component: ExpenseToBeExportedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
