import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  // Home urls
  {
    path: '',
    component: AppComponent,
    children: [
      // Home Url
      {
        path: '',
        component: HomeComponent
      }, 
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'update',
        component: UpdateComponent
      }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
