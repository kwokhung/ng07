import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ExportListComponent } from './components/export-list/export-list.component';
import { DuplicateInvoiceComponent } from './components/duplicate-invoice/duplicate-invoice.component';
import { ExpenseToBeExportedComponent } from './components/expense-to-be-exported/expense-to-be-exported.component';
import { LoginComponent } from './components/login/login.component';
import { ConfigComponent } from './components/config/config.component';

import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'export-list', component: ExportListComponent, canActivate: [AuthenticationGuard] },
  { path: 'duplicate-invoice', component: DuplicateInvoiceComponent, canActivate: [AuthenticationGuard] },
  { path: 'expense-to-be-exported', component: ExpenseToBeExportedComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'config', component: ConfigComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
