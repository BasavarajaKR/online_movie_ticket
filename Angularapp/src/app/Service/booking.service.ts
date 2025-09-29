import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingDetails, SeatSelection, BookingSummary } from '../Model/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsSubject = new BehaviorSubject<BookingDetails[]>([]);
  public bookings$ = this.bookingsSubject.asObservable();

  private currentBookingSubject = new BehaviorSubject<BookingSummary | null>(null);
  public currentBooking$ = this.currentBookingSubject.asObservable();

  constructor() {
    this.loadBookings();
  }

  private loadBookings(): void {
    // Load from localStorage or API
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      const bookings = JSON.parse(savedBookings);
      this.bookingsSubject.next(bookings);
    }
  }

  private saveBookings(): void {
    const bookings = this.bookingsSubject.value;
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }

  createBooking(bookingDetails: BookingDetails): Observable<BookingDetails> {
    return new Observable(observer => {
      const booking: BookingDetails = {
        ...bookingDetails,
        id: this.generateBookingId(),
        bookingDate: new Date()
      };

      const currentBookings = this.bookingsSubject.value;
      currentBookings.push(booking);
      this.bookingsSubject.next(currentBookings);
      this.saveBookings();

      observer.next(booking);
      observer.complete();
    });
  }

  updateCurrentBooking(booking: BookingSummary): void {
    this.currentBookingSubject.next(booking);
  }

  getCurrentBooking(): Observable<BookingSummary | null> {
    return this.currentBooking$;
  }

  getAllBookings(): Observable<BookingDetails[]> {
    return this.bookings$;
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
