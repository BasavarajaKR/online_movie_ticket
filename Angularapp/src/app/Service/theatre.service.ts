import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Theatre, Screen, Showtime, Seat, SeatRow } from '../Model/theatre.model';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  private theatresSubject = new BehaviorSubject<Theatre[]>([]);
  public theatres$ = this.theatresSubject.asObservable();

  private readonly apiBase = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
    this.loadTheatres();
  }

  private loadTheatres(): void {
    const fallbackTheatres: Theatre[] = [
      {
        id: 1,
        name: 'PVR Orion Mall',
        address: 'Dr Rajkumar Rd, Rajajinagar',
        city: 'Bengaluru',
        state: 'KA',
        zipCode: '560055',
        phone: '+91 80 1234 5678',
        totalScreens: 11,
        screens: [
          {
            id: 'PXL1',
            name: 'PXL',
            type: 'PXL',
            showtimes: [
              { time: '09:15 AM', price: 250, availableSeats: 80, totalSeats: 100 },
              { time: '12:30 PM', price: 300, availableSeats: 90, totalSeats: 100 },
              { time: '03:10 PM', price: 350, availableSeats: 85, totalSeats: 100 },
              { time: '07:20 PM', price: 400, availableSeats: 75, totalSeats: 100 },
              { time: '10:30 PM', price: 450, availableSeats: 95, totalSeats: 100 }
            ]
          },
          {
            id: 'JUNIOR1',
            name: 'JUNIOR',
            type: 'JUNIOR',
            showtimes: [
              { time: '09:45 AM', price: 200, availableSeats: 60, totalSeats: 80 },
              { time: '04:10 PM', price: 250, availableSeats: 70, totalSeats: 80 },
              { time: '07:20 PM', price: 300, availableSeats: 65, totalSeats: 80 }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'INOX Garuda Mall',
        address: 'Magrath Rd, Ashok Nagar',
        city: 'Bengaluru',
        state: 'KA',
        zipCode: '560025',
        phone: '+91 80 8765 4321',
        totalScreens: 7,
        screens: [
          {
            id: 'IMAX1',
            name: 'IMAX',
            type: 'IMAX',
            showtimes: [
              { time: '10:20 AM', price: 500, availableSeats: 120, totalSeats: 150 },
              { time: '04:25 PM', price: 600, availableSeats: 130, totalSeats: 150 },
              { time: '07:15 PM', price: 700, availableSeats: 110, totalSeats: 150 },
              { time: '10:30 PM', price: 800, availableSeats: 140, totalSeats: 150 }
            ]
          },
          {
            id: 'GOLD1',
            name: 'GOLD',
            type: 'GOLD',
            showtimes: [
              { time: '10:15 AM', price: 400, availableSeats: 40, totalSeats: 60 },
              { time: '01:15 PM', price: 450, availableSeats: 50, totalSeats: 60 },
              { time: '10:15 PM', price: 500, availableSeats: 45, totalSeats: 60 }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Cinepolis Royal Meenakshi',
        address: 'Bannerghatta Main Rd',
        city: 'Bengaluru',
        state: 'KA',
        zipCode: '560076',
        phone: '+91 80 2233 7788',
        totalScreens: 8,
        screens: [
          {
            id: 'PXL2',
            name: 'PXL',
            type: 'PXL',
            showtimes: [
              { time: '11:00 AM', price: 280, availableSeats: 90, totalSeats: 120 },
              { time: '02:30 PM', price: 320, availableSeats: 95, totalSeats: 120 },
              { time: '06:00 PM', price: 380, availableSeats: 85, totalSeats: 120 },
              { time: '09:30 PM', price: 420, availableSeats: 100, totalSeats: 120 }
            ]
          }
        ]
      },
      {
        id: 4,
        name: 'PVR Phoenix Marketcity',
        address: 'Mahadevpura',
        city: 'Bengaluru',
        state: 'KA',
        zipCode: '560048',
        phone: '+91 80 9988 7766',
        totalScreens: 10,
        screens: [
          {
            id: 'IMAX2',
            name: 'IMAX',
            type: 'IMAX',
            showtimes: [
              { time: '09:30 AM', price: 550, availableSeats: 140, totalSeats: 180 },
              { time: '01:00 PM', price: 650, availableSeats: 150, totalSeats: 180 },
              { time: '04:30 PM', price: 750, availableSeats: 135, totalSeats: 180 },
              { time: '08:00 PM', price: 850, availableSeats: 160, totalSeats: 180 },
              { time: '11:30 PM', price: 950, availableSeats: 170, totalSeats: 180 }
            ]
          },
          {
            id: 'JUNIOR2',
            name: 'JUNIOR',
            type: 'JUNIOR',
            showtimes: [
              { time: '10:00 AM', price: 220, availableSeats: 65, totalSeats: 90 },
              { time: '01:30 PM', price: 270, availableSeats: 70, totalSeats: 90 },
              { time: '05:00 PM', price: 320, availableSeats: 60, totalSeats: 90 },
              { time: '08:30 PM', price: 370, availableSeats: 75, totalSeats: 90 }
            ]
          }
        ]
      }
    ];

    this.http.get<Theatre[]>(`${this.apiBase}/theatres`).pipe(
      catchError(() => of(fallbackTheatres))
    ).subscribe((theatres) => this.theatresSubject.next(theatres));
  }

  getAllTheatres(): Observable<Theatre[]> {
    return this.theatres$;
  }

  getTheatreById(id: number): Observable<Theatre | undefined> {
    return new Observable(observer => {
      this.theatres$.subscribe(theatres => {
        const theatre = theatres.find(t => t.id === id);
        observer.next(theatre);
      });
    });
  }

  getTheatresByCity(city: string): Observable<Theatre[]> {
    return new Observable(observer => {
      this.theatres$.subscribe(theatres => {
        const filteredTheatres = theatres.filter(t => 
          t.city.toLowerCase().includes(city.toLowerCase())
        );
        observer.next(filteredTheatres);
      });
    });
  }

  generateSeats(): SeatRow[] {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    return rows.map(letter => ({
      letter,
      seats: Array.from({ length: 14 }, (_, i) => ({
        row: letter,
        number: i + 1,
        booked: Math.random() < 0.2,
        selected: false
      }))
    }));
  }

  getScreens(): string[] {
    return ['PXL', 'JUNIOR', 'GOLD', 'IMAX'];
  }

  getShowTimesPerScreen(): Record<string, string[]> {
    return {
      PXL: ['09:15 AM', '12:30 PM', '03:10 PM', '07:20 PM', '10:30 PM'],
      JUNIOR: ['09:45 AM', '04:10 PM', '07:20 PM'],
      GOLD: ['10:15 AM', '01:15 PM', '10:15 PM'],
      IMAX: ['10:20 AM', '04:25 PM', '07:15 PM', '10:30 PM']
    };
  }
}
