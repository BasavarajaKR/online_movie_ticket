import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './Component/admin/login/login.component';
import { BookingComponent } from './Component/admin/login/booking/booking';
import { MovieComponent } from './Component/admin/movie/movie.component';
import { TheatreComponent } from './Component/admin/login/theatre/theatre';
import { PaymentComponent } from './Component/admin/login/payment/payment';

import { MovieService } from './Service/movie.service';
import { TheatreService } from './Service/theatre.service';
import { BookingService } from './Service/booking.service';
import { AuthService } from './Service/auth.service';

import { routes } from './app.routes';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppComponent,
    LoginComponent,
    BookingComponent,
    MovieComponent,
    TheatreComponent,
    PaymentComponent
  ],
  providers: [
    MovieService,
    TheatreService,
    BookingService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }