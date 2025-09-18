import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theatre',
  imports: [CommonModule],
  templateUrl: './theatre.html',
  styleUrl: './theatre.css'
})
export class Theatre {
  theatres = [
    { name: 'PVR Orion Mall', address: 'Dr Rajkumar Rd, Rajajinagar', city: 'Bengaluru', state: 'KA', zipCode: '560055', phone: '+91 80 1234 5678', totalScreens: 11 },
    { name: 'INOX Garuda Mall', address: 'Magrath Rd, Ashok Nagar', city: 'Bengaluru', state: 'KA', zipCode: '560025', phone: '+91 80 8765 4321', totalScreens: 7 },
    { name: 'Cinepolis Royal Meenakshi', address: 'Bannerghatta Main Rd', city: 'Bengaluru', state: 'KA', zipCode: '560076', phone: '+91 80 2233 7788', totalScreens: 8 },
    { name: 'PVR Phoenix Marketcity', address: 'Mahadevpura', city: 'Bengaluru', state: 'KA', zipCode: '560048', phone: '+91 80 9988 7766', totalScreens: 10 }
  ];

  // Single-card carousel state
  currentIndex: number = 0;

  expandedTheatreIndex: number | null = null;
  dates: { label: string; value: string; week: string; day: number }[] = [];
  selectedDate: string = '';

  screens: string[] = ['PXL', 'JUNIOR', 'GOLD', 'IMAX'];
  showTimesPerScreen: Record<string, string[]> = {
    PXL: ['09:15 AM', '12:30 PM', '03:10 PM', '07:20 PM', '10:30 PM'],
    JUNIOR: ['09:45 AM', '04:10 PM', '07:20 PM'],
    GOLD: ['10:15 AM', '01:15 PM', '10:15 PM'],
    IMAX: ['10:20 AM', '04:25 PM', '07:15 PM', '10:30 PM']
  };

  constructor() {
    this.buildDates();
  }

  private buildDates() {
    const today = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
    this.dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return {
        label: `${dayName.format(d)} ${d.getDate()} ${formatter.format(d).toUpperCase()}`,
        value: d.toISOString().slice(0, 10),
        week: dayName.format(d),
        day: d.getDate()
      };
    });
    this.selectedDate = this.dates[0]?.value || '';
  }

  viewShows(index: number) {
    this.expandedTheatreIndex = this.expandedTheatreIndex === index ? null : index;
  }

  // Navigate between theatre cards
  prevCard() {
    if (!this.theatres.length) return;
    this.currentIndex = (this.currentIndex - 1 + this.theatres.length) % this.theatres.length;
    // collapse panel when navigating
    this.expandedTheatreIndex = null;
  }

  nextCard() {
    if (!this.theatres.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.theatres.length;
    // collapse panel when navigating
    this.expandedTheatreIndex = null;
  }

  selectDate(value: string) {
    this.selectedDate = value;
  }

  selectShow(theatreName: string, screen: string, time: string) {
    console.log('Selected show:', { theatreName, screen, time, date: this.selectedDate });
    this.selectedShow = { theatreName, screen, time, date: this.selectedDate, theatreIndex: this.expandedTheatreIndex ?? 0 };
    this.generateSeats();
  }

  // ===== Seat map state =====
  selectedShow: { theatreName: string; screen: string; time: string; date: string; theatreIndex: number } | null = null;
  seatRows: { letter: string; seats: { number: number; booked: boolean; selected: boolean }[] }[] = [];

  private generateSeats() {
    // Simple grid: 8 rows x 14 seats. Randomly mark some as booked.
    const rows = ['A','B','C','D','E','F','G','H'];
    this.seatRows = rows.map(letter => ({
      letter,
      seats: Array.from({ length: 14 }, (_, i) => ({
        number: i + 1,
        booked: Math.random() < 0.2,
        selected: false
      }))
    }));
  }

  toggleSeat(rowIndex: number, seatIndex: number) {
    const seat = this.seatRows[rowIndex]?.seats[seatIndex];
    if (!seat || seat.booked) return;
    seat.selected = !seat.selected;
  }
}
