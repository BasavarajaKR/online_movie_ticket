import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../../../Service/booking.service';
import { BookingSummary } from '../../../../Model/booking.model';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export class PaymentComponent implements OnInit {
  method: 'upi' | 'card' = 'upi';
  isProcessing: boolean = false;
  summary: BookingSummary | null = null;

  upi = {
    id: ''
  };

  card = {
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  };

  get isUpiValid(): boolean {
    return /.+@.+/.test(this.upi.id.trim());
  }

  get isCardValid(): boolean {
    const nameOk = this.card.name.trim().length > 1;
    const numberOk = /^[0-9]{16}$/.test(this.card.number.replace(/\s+/g, ''));
    const expiryOk = /^(0[1-9]|1[0-2])\/(\d{2})$/.test(this.card.expiry.trim());
    const cvvOk = /^[0-9]{3,4}$/.test(this.card.cvv.trim());
    return nameOk && numberOk && expiryOk && cvvOk;
  }

  setMethod(m: 'upi' | 'card') {
    this.method = m;
  }

  formatCardNumber() {
    const digits = this.card.number.replace(/\D/g, '').slice(0, 16);
    this.card.number = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }

  constructor(private router: Router, private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getCurrentBooking().subscribe(s => {
      this.summary = s;
    });
  }

  seatsLabel(summary: BookingSummary | null): string {
    if (!summary || !summary.seats) return '';
    return summary.seats.map(seat => `${seat.row}${seat.number}`).join(', ');
  }

  submit() {
    if ((this.method === 'upi' && !this.isUpiValid) || (this.method === 'card' && !this.isCardValid)) {
      alert('Please fill valid payment details.');
      return;
    }
    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      // finalize booking if a summary exists
      this.bookingService.getCurrentBooking().subscribe(summary => {
        if (summary) {
          const payload: any = {
            id: '',
            movieId: 0,
            theatreId: 0,
            screenId: summary.theatre.screen,
            showtime: summary.show.time,
            date: summary.show.date,
            seats: summary.seats,
            totalAmount: summary.totalAmount,
            paymentStatus: 'completed',
            bookingDate: new Date()
          };
          this.bookingService.createBooking(payload).subscribe(() => {
            alert('Payment successful! Booking confirmed.');
            this.router.navigate(['/']);
          });
        } else {
          alert('Payment successful!');
          this.router.navigate(['/']);
        }
      });
    }, 1200);
  }
}
