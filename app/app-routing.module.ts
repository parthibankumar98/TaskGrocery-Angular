import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewStockComponent } from './new-stock/new-stock.component';
import { ImageSlideshowComponent } from './image-slideshow/image-slideshow.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'new-stock', component: NewStockComponent },
  { path: 'image-slideshow', component: ImageSlideshowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
