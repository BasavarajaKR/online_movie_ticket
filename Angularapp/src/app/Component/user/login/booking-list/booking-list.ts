import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../../../Service/booking.service';
import { BookingDetails } from '../../../../Model/booking.model';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
  <app-navbar></app-navbar>
  <section class="page">
    <div class="header">
      <h2>My Bookings</h2>
      <a routerLink="/movies" class="link">Book more tickets →</a>
    </div>

    <div *ngIf="bookings.length === 0" class="empty">
      <div class="empty-card">
        <div class="icon">🎫</div>
        <h3>No bookings yet</h3>
        <p>Start by exploring movies and showtimes.</p>
        <a routerLink="/movies" class="primary-btn">Browse Movies</a>
      </div>
    </div>

    <div class="grid" *ngIf="bookings.length > 0">
      <div class="card" *ngFor="let b of bookings">
        <div class="card-header">
          <div class="title">Booking #{{ b.id || '—' }}</div>
          <span class="status" [class.completed]="b.paymentStatus==='completed'">{{ b.paymentStatus }}</span>
        </div>
        <div class="row">
          <div class="col">
            <div class="label">Showtime</div>
            <div class="value">{{ b.date }} • {{ b.showtime }}</div>
          </div>
          <div class="col">
            <div class="label">Seats</div>
            <div class="value">{{ seatsLabel(b) }}</div>
          </div>
          <div class="col right">
            <div class="label">Total</div>
            <div class="price">₹{{ b.totalAmount }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `,
  styles: [
    `
    :host { display: block; }
    .page { max-width: 1100px; margin: 24px auto; padding: 0 16px; color: #e6e8f5; }
    .header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
    .header h2 { margin:0; font-size:26px; color:#ffffff; }
    .link { color:#a5b4ff; text-decoration:none; }
    .link:hover { text-decoration:underline; }

    .empty { display:flex; justify-content:center; padding:48px 0; }
    .empty-card { background:#1b1e2e; border:1px solid #2a2e44; border-radius:14px; padding:32px; text-align:center; width:100%; max-width:560px; color:#e6e8f5; box-shadow: 0 6px 16px rgba(0,0,0,.35); }
    .empty-card .icon { font-size:44px; margin-bottom:10px; }
    .empty-card h3 { margin:8px 0; font-size:20px; }
    .primary-btn { display:inline-block; margin-top:14px; padding:10px 16px; background:linear-gradient(90deg,#6b6cf6,#9b6cff); color:white; border-radius:8px; text-decoration:none; box-shadow:0 4px 10px rgba(107,108,246,.4); }

    .grid { display:grid; grid-template-columns: repeat(auto-fill,minmax(300px,1fr)); gap:18px; }
    .card { background:#ffffff; border:1px solid #e5e7eb; border-radius:14px; padding:16px; box-shadow: 0 6px 16px rgba(0,0,0,.20); transition: transform .2s ease, border-color .2s ease; color:#111827; }
    .card:hover { transform: translateY(-2px); border-color:#d1d5db; }
    .card-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
    .title { font-weight:700; color:#111827; }
    .status { padding:4px 10px; border-radius:999px; font-size:12px; background:#f3f4f6; color:#111827; text-transform:capitalize; }
    .status.completed { background:#d1fae5; color:#065f46; }
    .row { display:flex; gap:16px; }
    .col { flex:1; }
    .col.right { text-align:right; }
    .label { opacity:1; font-size:12px; margin-bottom:4px; color:#6b7280; }
    .value { font-size:14px; color:#1f2937; }
    .price { font-weight:800; font-size:18px; color:#111827; }
    `
  ]
})
export class BookingListComponent implements OnInit {
  bookings: BookingDetails[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe(list => {
      this.bookings = list || [];
    });
  }

  seatsLabel(b: BookingDetails): string {
    if (!b || !b.seats) return '';
    return b.seats.map(s => `${s.row}${s.number}`).join(', ');
  }
}


