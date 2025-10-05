import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-theatre',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './theatre.html',
  styleUrls: ['./theatre.css']
})
export class TheatreComponent {
  theatres: Array<{
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    totalScreens: number;
    pricing: { [key: string]: number };
  }> = [
    { name: 'PVR Orion Mall', address: 'Dr Rajkumar Rd, Rajajinagar', city: 'Bengaluru', state: 'KA', zipCode: '560055', phone: '+91 80 1234 5678', totalScreens: 11, pricing: { PXL: 750, JUNIOR: 650, GOLD: 850, IMAX: 950 } },
    { name: 'INOX Garuda Mall', address: 'Magrath Rd, Ashok Nagar', city: 'Bengaluru', state: 'KA', zipCode: '560025', phone: '+91 80 8765 4321', totalScreens: 7, pricing: { PXL: 700, JUNIOR: 600, GOLD: 800, IMAX: 900 } },
    { name: 'Cinepolis Royal Meenakshi', address: 'Bannerghatta Main Rd', city: 'Bengaluru', state: 'KA', zipCode: '560076', phone: '+91 80 2233 7788', totalScreens: 8, pricing: { PXL: 680, JUNIOR: 580, GOLD: 780, IMAX: 880 } },
    { name: 'PVR Phoenix Marketcity', address: 'Mahadevpura', city: 'Bengaluru', state: 'KA', zipCode: '560048', phone: '+91 80 9988 7766', totalScreens: 10, pricing: { PXL: 720, JUNIOR: 620, GOLD: 820, IMAX: 920 } }
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

  constructor(private router: Router) {
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
    // Reset seat selection state when new show is selected
    this.numberOfSeatsToSelect = 0;
    this.totalSelectedSeats = 0;
    this.isSeatCountSet = false;
    this.bestsellerSeats = false;
  }

  // ===== Seat map state =====
  selectedShow: { theatreName: string; screen: string; time: string; date: string; theatreIndex: number } | null = null;
  seatRows: { letter: string; seats: { number: number; booked: boolean; selected: boolean }[] }[] = [];
  
  // Seat selection validation
  numberOfSeatsToSelect: number = 0;
  totalSelectedSeats: number = 0;
  isSeatCountSet: boolean = false;
  bestsellerSeats: boolean = false;
  

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
    // Reset selected seats count when generating new seat map
    this.totalSelectedSeats = 0;
  }

  toggleSeat(rowIndex: number, seatIndex: number) {
    const seat = this.seatRows[rowIndex]?.seats[seatIndex];
    if (!seat || seat.booked) return;
    
    // Check if seat count is set before allowing selection
    if (!this.isSeatCountSet) {
      return;
    }
    
    // Prevent selecting more seats than required
    if (!seat.selected && this.totalSelectedSeats >= this.numberOfSeatsToSelect) {
      return;
    }
    
    seat.selected = !seat.selected;
    
    // Update selected seats count
    this.totalSelectedSeats = this.getSelectedSeatsCount();
    
    // Automatically navigate to payment page when all seats are selected
    if (this.remainingSeatsToSelect === 0) {
      // Small delay to show the selection visually before navigating
      setTimeout(() => {
        this.navigateToPayment();
      }, 500);
    }
  }

  setSeatCount(count: number) {
    if (count > 0 && count <= 20) { // Reasonable limit
      this.numberOfSeatsToSelect = count;
      this.isSeatCountSet = true;
      
      // Clear any previously selected seats when setting new count
      this.clearAllSelections();
    }
  }

  private getSelectedSeatsCount(): number {
    return this.seatRows.reduce((total, row) => 
      total + row.seats.filter(seat => seat.selected).length, 0);
  }

  clearAllSelections() {
    this.seatRows.forEach(row => {
      row.seats.forEach(seat => {
        seat.selected = false;
      });
    });
    this.totalSelectedSeats = 0;
  }

  get remainingSeatsToSelect(): number {
    return Math.max(0, this.numberOfSeatsToSelect - this.totalSelectedSeats);
  }

  navigateToPayment() {
    // Prepare booking data to pass to payment page
    const bookingData = {
      selectedShow: this.selectedShow,
      selectedSeats: this.getSelectedSeatsDetails(),
      numberOfSeats: this.numberOfSeatsToSelect,
      bestsellerSeats: this.bestsellerSeats,
      totalPrice: this.getTotalPrice()
    };
    
    // Store booking data in sessionStorage to pass to payment page
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Navigate to user payment page
    this.router.navigate(['/payment']);
  }


  getSelectedSeatsDetails(): string[] {
    const selectedSeats: string[] = [];
    this.seatRows.forEach(row => {
      row.seats.forEach(seat => {
        if (seat.selected) {
          selectedSeats.push(`${row.letter}${seat.number}`);
        }
      });
    });
    return selectedSeats;
  }

  getTotalPrice(): number {
    const basePrice = this.getSeatPrice(); // Get actual price based on theatre and screen
    const bestsellerPrice = this.bestsellerSeats ? 100 : 0; // Extra for bestseller
    return (basePrice + bestsellerPrice) * this.numberOfSeatsToSelect;
  }

  getSeatPrice(): number {
    if (!this.selectedShow || this.expandedTheatreIndex === null) {
      return 500; // Default price
    }
    const theatre = this.theatres[this.expandedTheatreIndex];
    return theatre.pricing[this.selectedShow.screen as string] || 500;
  }

  getScreenPrice(theatreIndex: number, screen: string): number {
    const theatre = this.theatres[theatreIndex];
    return theatre.pricing[screen] || 500;
  }

}
