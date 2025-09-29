import { Routes } from '@angular/router';
import { LoginComponent } from './Component/admin/login/login.component';
import { BookingComponent } from './Component/admin/login/booking/booking';
import { MovieComponent } from './Component/admin/movie/movie.component';
import { TheatreComponent } from './Component/admin/login/theatre/theatre';
import { PaymentComponent } from './Component/admin/login/payment/payment';

export const routes: Routes = [
  { path: 'admin/login', loadComponent: () => Promise.resolve(LoginComponent) },
  { path: 'admin/movie', loadComponent: () => Promise.resolve(MovieComponent) },
  { path: 'admin/booking', loadComponent: () => Promise.resolve(BookingComponent) },
  { path: 'admin/theatre', loadComponent: () => Promise.resolve(TheatreComponent) },
  { path: 'admin/payment', loadComponent: () => Promise.resolve(PaymentComponent) },
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' }
];
