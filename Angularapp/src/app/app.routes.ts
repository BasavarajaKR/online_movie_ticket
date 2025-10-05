import { Routes } from '@angular/router';
import { MovieComponent as UserMovieComponent } from './Component/user/movie/movie.component';
import { BookingComponent as UserBookingComponent } from './Component/user/login/booking/booking';
import { LoginComponent as AdminLoginComponent } from './Component/admin/login/login.component';
import { DashboardComponent } from './Component/admin/dashboard/dashboard.component';
import { BookingComponent } from './Component/admin/login/booking/booking';
import { MovieComponent as AdminMovieComponent } from './Component/admin/movie/movie.component';
import { TheatreComponent } from './Component/admin/login/theatre/theatre';
import { TheatreComponent as UserTheatreComponent } from './Component/user/login/theatre/theatre';
import { PaymentComponent } from './Component/admin/login/payment/payment';
import { PaymentComponent as UserPaymentComponent } from './Component/user/login/payment/payment';
import { AdminGuard } from './Service/admin.guard';
import { UserGuard } from './Service/user.guard';
import { LoginComponent as UserLoginComponent } from './Component/user/login/login.component';
// Lazy/standalone Signup will be created

export const routes: Routes = [
  // Public auth routes
  { path: 'login', loadComponent: () => Promise.resolve(UserLoginComponent) },
  { path: 'signup', loadComponent: () => import('./Component/user/login/user/user').then(m => m.User) },

  // User routes (protected)
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', canActivate: [UserGuard], loadComponent: () => Promise.resolve(UserMovieComponent) },
  { path: 'booking', canActivate: [UserGuard], loadComponent: () => Promise.resolve(UserBookingComponent) },
  { path: 'theatres', canActivate: [UserGuard], loadComponent: () => Promise.resolve(UserTheatreComponent) },
  { path: 'my-bookings', canActivate: [UserGuard], loadComponent: () => import('./Component/user/login/booking-list/booking-list').then(m => m.BookingListComponent) },
  { path: 'payment', canActivate: [UserGuard], loadComponent: () => Promise.resolve(UserPaymentComponent) },
  
  // Admin routes
  { path: 'admin/login', loadComponent: () => Promise.resolve(AdminLoginComponent) },
  { 
    path: 'admin', 
    loadComponent: () => Promise.resolve(DashboardComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'admin/dashboard', 
    loadComponent: () => Promise.resolve(DashboardComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'admin/movie', 
    loadComponent: () => Promise.resolve(AdminMovieComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'admin/booking', 
    loadComponent: () => Promise.resolve(BookingComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'admin/theatre', 
    loadComponent: () => Promise.resolve(TheatreComponent),
    canActivate: [AdminGuard]
  },
  { 
    path: 'admin/payment', 
    loadComponent: () => Promise.resolve(PaymentComponent),
    canActivate: [AdminGuard]
  }
];
