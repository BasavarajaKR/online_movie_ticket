export interface BookingDetails {
  id: string;
  movieId: number;
  theatreId: number;
  screenId: string;
  showtime: string;
  date: string;
  seats: SeatSelection[];
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  bookingDate: Date;
  userId?: string;
}

export interface SeatSelection {
  row: string;
  number: number;
  price: number;
}

export interface BookingSummary {
  movie: {
    title: string;
    poster: string;
    duration: number;
  };
  theatre: {
    name: string;
    address: string;
    screen: string;
  };
  show: {
    date: string;
    time: string;
  };
  seats: SeatSelection[];
  totalAmount: number;
}
