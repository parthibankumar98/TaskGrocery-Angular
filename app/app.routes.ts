import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewStockComponent } from './new-stock/new-stock.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'new-stock', component: NewStockComponent },
];
