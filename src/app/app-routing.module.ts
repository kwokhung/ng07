import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExportListComponent } from './components/export-list/export-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'export-list', component: ExportListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
