export interface Theatre {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  totalScreens: number;
  screens?: Screen[];
}

export interface Screen {
  id: string;
  name: string;
  type: 'PXL' | 'JUNIOR' | 'GOLD' | 'IMAX';
  showtimes: Showtime[];
}

export interface Showtime {
  time: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

export interface Seat {
  row: string;
  number: number;
  booked: boolean;
  selected: boolean;
}

export interface SeatRow {
  letter: string;
  seats: Seat[];
}
