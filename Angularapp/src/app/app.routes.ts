import { Routes } from '@angular/router';
import { LoginComponent } from './Component/admin/login/login.component';
import { Booking } from './Component/admin/login/booking/booking';
import { MovieComponent } from './Component/admin/movie/movie.component';
import { Theatre } from './Component/admin/login/theatre/theatre';
import { Payment } from './Component/admin/login/payment/payment';

export const routes: Routes = [
  { path: 'admin/login', loadComponent: () => Promise.resolve(LoginComponent) },
  { path: 'admin/movie', loadComponent: () => Promise.resolve(MovieComponent) },
  { path: 'admin/booking', loadComponent: () => Promise.resolve(Booking) },
  { path: 'admin/theatre', loadComponent: () => Promise.resolve(Theatre) },
  { path: 'admin/payment', loadComponent: () => Promise.resolve(Payment) },
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' }
];
