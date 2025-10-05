import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BookingDetails, SeatSelection, BookingSummary } from '../Model/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsSubject = new BehaviorSubject<BookingDetails[]>([]);
  public bookings$ = this.bookingsSubject.asObservable();

  private currentBookingSubject = new BehaviorSubject<BookingSummary | null>(null);
  public currentBooking$ = this.currentBookingSubject.asObservable();

  private readonly apiBase = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
    this.loadBookings();
  }

  private loadBookings(): void {
    // Load from localStorage or API (guard SSR)
    if (typeof window !== 'undefined' && window?.localStorage) {
      const savedBookings = localStorage.getItem('bookings');
      if (savedBookings) {
        const bookings = JSON.parse(savedBookings);
        this.bookingsSubject.next(bookings);
      }
    }
  }

  private saveBookings(): void {
    const bookings = this.bookingsSubject.value;
    if (typeof window !== 'undefined' && window?.localStorage) {
      localStorage.setItem('bookings', JSON.stringify(bookings));
    }
  }

  createBooking(bookingDetails: BookingDetails): Observable<BookingDetails> {
    return this.http.post<BookingDetails>(`${this.apiBase}/bookings`, bookingDetails).pipe(
      catchError(() => {
        // fallback to local storage when backend is unavailable
        const booking: BookingDetails = {
          ...bookingDetails,
          id: this.generateBookingId(),
          bookingDate: new Date()
        };
        const currentBookings = this.bookingsSubject.value;
        currentBookings.push(booking);
        this.bookingsSubject.next(currentBookings);
        this.saveBookings();
        return of(booking);
      })
    );
  }

  updateCurrentBooking(booking: BookingSummary): void {
    this.currentBookingSubject.next(booking);
  }

  getCurrentBooking(): Observable<BookingSummary | null> {
    return this.currentBooking$;
  }

  getAllBookings(): Observable<BookingDetails[]> {
    return this.http.get<BookingDetails[]>(`${this.apiBase}/bookings`).pipe(
      catchError(() => of(this.bookingsSubject.value))
    );
  }

  getBookingById(id: string): Observable<BookingDetails | undefined> {
    return new Observable(observer => {
      this.bookings$.subscribe(bookings => {
        const booking = bookings.find(b => b.id === id);
        observer.next(booking);
      });
    });
  }

  updatePaymentStatus(bookingId: string, status: 'pending' | 'completed' | 'failed'): void {
    const bookings = this.bookingsSubject.value;
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.paymentStatus = status;
      this.bookingsSubject.next(bookings);
      this.saveBookings();
    }
  }

  private generateBookingId(): string {
    return 'BK' + Date.now() + Math.random().toString(36).substr(2, 9);
  }

  clearCurrentBooking(): void {
    this.currentBookingSubject.next(null);
  }

  calculateTotalAmount(seats: SeatSelection[]): number {
    return seats.reduce((total, seat) => total + seat.price, 0);
  }
}
