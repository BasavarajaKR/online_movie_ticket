import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
interface Movie {
  movieId: number;
  title: string;
  language: string;
  genre: string;
  duration: number;
  releaseDate: string;
  rating: number;
  poster: string;
  description: string;
  director: string;
  cast: string;
  fallbackPoster?: string;
  showtimes: Showtime[];
}

interface Showtime {
  time: string;
  theater: string;
  price: number;
}

interface Seat {
  row: string;
  number: number;
  occupied: boolean;
}

interface SeatRow {
  letter: string;
  seats: Seat[];
}

@Component({
  selector: 'app-booking',
  imports: [CommonModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class BookingComponent implements OnInit, OnDestroy {
  currentUser: string = 'Admin User';
  currentYear: number = new Date().getFullYear();
  selectedMovie: Movie | null = null;
  selectedShowtime: Showtime | null = null;
  selectedSeats: Seat[] = [];
  seatRows: SeatRow[] = [];
  // UI state
  selectedLanguage: string = 'All';
  languages: string[] = ['English', 'Telugu', 'Kannada', 'Hindi'];
  // Pagination
  pageSize: number = 16;
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];
  pagedMovies: Movie[] = [];
  // Details modal
  showDetails: boolean = false;
  detailsMovie: Movie | null = null;

  // Landing hero banners
  banners: { image: string; title: string; subtitle: string; offers: string[] }[] = [
    {
      image: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1600&auto=format&fit=crop',
      title: 'Blockbuster Weekends',
      subtitle: 'Big screens. Bigger stories. Experience cinema like never before.',
      offers: ['Flat 20% Off', 'Buy 1 Get 1', 'Free Popcorn']
    },
    {
      image: 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1600&auto=format&fit=crop',
      title: 'Premium IMAX Experience',
      subtitle: 'Feel the roar and the details with crystal clear sound.',
      offers: ['IMAX Pass', 'Student Discount', 'Cashback 10%']
    },
    {
      image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1600&auto=format&fit=crop',
      title: 'Festival Specials',
      subtitle: 'Celebrate stories from around the world this season.',
      offers: ['Early Bird', 'Elite Lounge', 'Combo Deals']
    }
  ];
  activeSlide: number = 0;
  private slideTimerId: any;

  // Carousel
  @ViewChild('carousel') carouselRef?: ElementRef<HTMLDivElement>;

  // Footer
  today: Date = new Date();

  movies: Movie[] = [
    {
      movieId: 1,
      title: 'Avengers: Endgame',
      language: 'English',
      genre: 'Action, Adventure',
      duration: 181,
      releaseDate: '2019-04-26',
      rating: 8.4,
      poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
      description: 'The Avengers assemble for a final showdown to undo the snap and defeat Thanos.',
      director: 'Anthony Russo, Joe Russo',
      cast: 'Robert Downey Jr., Chris Evans, Chris Hemsworth, Scarlett Johansson',
      showtimes: [
        { time: '10:00 AM', theater: 'Screen 1', price: 250 },
        { time: '2:00 PM', theater: 'Screen 1', price: 300 },
        { time: '6:00 PM', theater: 'Screen 1', price: 350 }
      ]
    },
    {
      movieId: 2,
      title: 'Spider-Man: No Way Home',
      language: 'English',
      genre: 'Action, Adventure',
      duration: 148,
      releaseDate: '2021-12-17',
      rating: 8.2,
      poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg',
      description: 'Peter Parker seeks help from Doctor Strange as the multiverse cracks open.',
      director: 'Jon Watts',
      cast: 'Tom Holland, Zendaya, Benedict Cumberbatch',
      showtimes: [
        { time: '11:30 AM', theater: 'Screen 2', price: 280 },
        { time: '3:30 PM', theater: 'Screen 2', price: 320 },
        { time: '7:30 PM', theater: 'Screen 2', price: 380 }
      ]
    },
    {
      movieId: 3,
      title: 'Dune',
      language: 'English',
      genre: 'Sci-Fi, Drama',
      duration: 155,
      releaseDate: '2021-10-22',
      rating: 8.0,
      poster: 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
      description: 'A noble family becomes embroiled in a war on a desert planet to control spice.',
      director: 'Denis Villeneuve',
      cast: 'Timothée Chalamet, Rebecca Ferguson, Oscar Isaac',
      showtimes: [
        { time: '12:00 PM', theater: 'Screen 3', price: 300 },
        { time: '4:00 PM', theater: 'Screen 3', price: 350 },
        { time: '8:00 PM', theater: 'Screen 3', price: 400 }
      ]
    },
    {
      movieId: 4,
      title: 'Baahubali 2: The Conclusion',
      language: 'Telugu',
      genre: 'Action, Drama',
      duration: 167,
      releaseDate: '2017-04-28',
      rating: 8.2,
      poster: 'https://rukminim2.flixcart.com/image/704/844/kzygpzk0/poster/r/q/s/large-movie-bahubali-2-posters-on-large-print-36x24-inches-original-imagbukjsjtksjsg.jpeg?q=90&crop=false',
      description: 'Shiva discovers his roots and rises to fulfill his destiny to save Mahishmati.',
      director: 'S. S. Rajamouli',
      cast: 'Prabhas, Anushka Shetty, Rana Daggubati',
      showtimes: [
        { time: '1:00 PM', theater: 'Screen 4', price: 200 },
        { time: '5:00 PM', theater: 'Screen 4', price: 250 },
        { time: '9:00 PM', theater: 'Screen 4', price: 300 }
      ]
    },
    {
      movieId: 5,
      title: 'RRR',
      language: 'Telugu',
      genre: 'Action, Drama',
      duration: 187,
      releaseDate: '2022-03-25',
      rating: 8.0,
      poster: 'https://stat4.bollywoodhungama.in/wp-content/uploads/2019/03/RRR-2022.jpeg',
      description: 'Two revolutionaries fight against British rule in 1920s India.',
      director: 'S. S. Rajamouli',
      cast: 'N. T. Rama Rao Jr., Ram Charan, Alia Bhatt',
      showtimes: [
        { time: '2:30 PM', theater: 'Screen 5', price: 220 },
        { time: '6:30 PM', theater: 'Screen 5', price: 270 },
        { time: '10:30 PM', theater: 'Screen 5', price: 320 }
      ]
    },
    {
      movieId: 6,
      title: 'The Batman',
      language: 'English',
      genre: 'Action, Crime',
      duration: 176,
      releaseDate: '2022-03-04',
      rating: 7.8,
      poster: 'https://c8.alamy.com/comp/2P609PM/the-batman-poster-2P609PM.jpg',
      description: 'Batman uncovers corruption in Gotham while pursuing the Riddler.',
      director: 'Matt Reeves',
      cast: 'Robert Pattinson, Zoë Kravitz, Paul Dano',
      showtimes: [
        { time: '11:00 AM', theater: 'Screen 6', price: 300 },
        { time: '3:00 PM', theater: 'Screen 6', price: 350 },
        { time: '7:00 PM', theater: 'Screen 6', price: 400 }
      ]
    },
    {
      movieId: 7,
      title: 'Kantara',
      language: 'Kannada',
      genre: 'Action, Drama, Thriller',
      duration: 148,
      releaseDate: '2022-09-30',
      rating: 8.5,
      poster: 'https://tse3.mm.bing.net/th/id/OIP.VtCHhMc5jzrlQ409cX-ctgHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3',
      description: 'A tale rooted in folklore where a man protects his village and forest.',
      director: 'Rishab Shetty',
      cast: 'Rishab Shetty, Sapthami Gowda, Kishore',
      showtimes: [
        { time: '10:30 AM', theater: 'Screen 7', price: 180 },
        { time: '2:30 PM', theater: 'Screen 7', price: 220 },
        { time: '6:30 PM', theater: 'Screen 7', price: 280 }
      ]
    },
    {
      movieId: 8,
      title: 'KGF: Chapter 2',
      language: 'Kannada',
      genre: 'Action, Crime, Drama',
      duration: 168,
      releaseDate: '2022-04-14',
      rating: 8.3,
      poster: 'https://i.pinimg.com/736x/ee/77/45/ee774576e8372d90f998ada26e5ea8e3.jpg',
      description: 'Rocky rises in the underworld to protect Kolar Gold Fields from enemies.',
      director: 'Prashanth Neel',
      cast: 'Yash, Srinidhi Shetty, Sanjay Dutt',
      showtimes: [
        { time: '12:00 PM', theater: 'Screen 8', price: 200 },
        { time: '4:00 PM', theater: 'Screen 8', price: 250 },
        { time: '8:00 PM', theater: 'Screen 8', price: 300 }
      ]
    },
    {
      movieId: 9,
      title: 'Sapta Sagaradaache Ello',
      language: 'Kannada',
      genre: 'Romance, Drama',
      duration: 142,
      releaseDate: '2023-08-25',
      rating: 8.1,
      poster: 'https://images.fandango.com/ImageRenderer/820/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/232994/SaptaSagaradaacheEllo_SideA.jpg',
      fallbackPoster: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=600&auto=format&fit=crop',
      description: 'A moving love story that spans time and distance.',
      director: 'Hemanth M Rao',
      cast: 'Rakshit Shetty, Rukmini Vasanth',
      showtimes: [
        { time: '11:15 AM', theater: 'Screen 9', price: 160 },
        { time: '3:15 PM', theater: 'Screen 9', price: 200 },
        { time: '7:15 PM', theater: 'Screen 9', price: 240 }
      ]
    },
    {
      movieId: 10,
      title: 'Tagaru',
      language: 'Kannada',
      genre: 'Action, Crime, Thriller',
      duration: 155,
      releaseDate: '2018-06-01',
      rating: 7.9,
      poster: 'https://assets.voxcinemas.com/posters/P_HO00005344.jpg',
      fallbackPoster: 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=600&auto=format&fit=crop',
      description: 'An intense cop-versus-gangster drama set in Bengaluru.',
      director: 'Duniya Soori',
      cast: 'Shiva Rajkumar, Dhananjaya',
      showtimes: [
        { time: '1:30 PM', theater: 'Screen 10', price: 170 },
        { time: '5:30 PM', theater: 'Screen 10', price: 210 },
        { time: '9:30 PM', theater: 'Screen 10', price: 250 }
      ]
    },
    {
      movieId: 11,
      title: 'Vikrant Rona',
      language: 'Kannada',
      genre: 'Action, Adventure, Thriller',
      duration: 162,
      releaseDate: '2022-07-28',
      rating: 7.7,
      poster: 'https://tse3.mm.bing.net/th/id/OIP.n7JJD3a3k2S5ODy6iRl_UgHaLH?w=1500&h=2250&rs=1&pid=ImgDetMain&o=7&rm=3',
      fallbackPoster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963f?q=80&w=600&auto=format&fit=crop',
      description: 'An action-adventure mystery led by a daring police inspector.',
      director: 'Anup Bhandari',
      cast: 'Sudeep, Nirup Bhandari, Neetha Ashok',
      showtimes: [
        { time: '10:45 AM', theater: 'Screen 11', price: 190 },
        { time: '2:45 PM', theater: 'Screen 11', price: 230 },
        { time: '6:45 PM', theater: 'Screen 11', price: 270 }
      ]
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeSeats();
    this.applyFiltersAndPaging();
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  initializeSeats() {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    this.seatRows = rows.map(letter => ({
      letter,
      seats: Array.from({ length: 10 }, (_, i) => ({
        row: letter,
        number: i + 1,
        occupied: Math.random() < 0.3 // Randomly occupy 30% of seats
      }))
    }));
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.selectedShowtime = null;
    this.selectedSeats = [];
  }

  onCardClick(movie: Movie) {
    this.selectMovie(movie);
    // Scroll to showtime section smoothly
    setTimeout(() => {
      const el = document.querySelector('.showtime-selection');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  bookNow(movie: Movie) {
    // Optionally select the movie first
    this.selectMovie(movie);
    // Navigate to theatre page with movieId
    this.router.navigate(['/admin/theatre'], { queryParams: { movieId: movie.movieId } });
  }

  // Hero slider controls
  private startAutoSlide() {
    this.stopAutoSlide();
    this.slideTimerId = setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.banners.length;
    }, 5000);
  }

  private stopAutoSlide() {
    if (this.slideTimerId) {
      clearInterval(this.slideTimerId);
      this.slideTimerId = null;
    }
  }

  goToSlide(index: number) {
    this.activeSlide = index % this.banners.length;
    this.startAutoSlide();
  }

  onBannerError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1600&auto=format&fit=crop';
  }

  onBannerCTAClick(_banner: { image: string; title: string }) {
    const section = document.querySelector('.carousel-section');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Carousel scrolling
  scrollCarousel(direction: 'left' | 'right') {
    const el = this.carouselRef?.nativeElement;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  // Filters
  setLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.currentPage = 1;
    this.applyFiltersAndPaging();
  }

  private applyFiltersAndPaging() {
    let filtered = this.selectedLanguage === 'All'
      ? this.movies
      : this.movies.filter(m => m.language === this.selectedLanguage);

    this.totalPages = Math.max(1, Math.ceil(filtered.length / this.pageSize));
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedMovies = filtered.slice(start, end);
  }

  // Pagination controls
  goToPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.currentPage = p;
    this.applyFiltersAndPaging();
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  selectShowtime(showtime: Showtime) {
    this.selectedShowtime = showtime;
    this.selectedSeats = [];
  }

  toggleSeat(seat: Seat) {
    if (seat.occupied) return;

    const index = this.selectedSeats.findIndex(s => s.row === seat.row && s.number === seat.number);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push({ ...seat });
    }
  }

  // Details modal open/close
  openDetails(movie: Movie) {
    this.detailsMovie = movie;
    this.showDetails = true;
  }

  closeDetails() {
    this.showDetails = false;
    this.detailsMovie = null;
  }

  onImageError(event: Event, movie: Movie) {
    const img = event.target as HTMLImageElement;
    if (movie.fallbackPoster) {
      img.src = movie.fallbackPoster;
    } else {
      img.src = 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600&auto=format&fit=crop';
    }
  }

  isSeatSelected(seat: Seat): boolean {
    return this.selectedSeats.some(s => s.row === seat.row && s.number === seat.number);
  }

  getTotalPrice(): number {
    if (!this.selectedShowtime) return 0;
    return this.selectedSeats.length * this.selectedShowtime.price;
  }

  proceedToPayment() {
    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    // Navigate to payment page (you can implement this later)
    alert(`Booking confirmed! Total: ₹${this.getTotalPrice()}`);
  }

  logout() {
    this.router.navigate(['/admin/login']);
  }
}
