import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

interface Movie {
  movieId: number;
  title: string;
  language: string;
  genre: string;
  duration: number;
  releaseDate: string;
  rating: number;
  poster: string;
  showtimes: Showtime[];
}

interface LocationArea {
  name: string;
  image: string;
  theatres: string[];
}

interface Showtime {
  time: string;
  theater: string;
  price: number;
}

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  selectedLanguage: string = 'All';
  languages: string[] = ['All', 'English', 'Telugu', 'Kannada'];
  filteredMovies: Movie[] = [];
  currentYear: number = new Date().getFullYear();
  locations: LocationArea[] = [
    { name: 'Bengaluru', image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop', theatres: ['PVR Orion Mall', 'INOX Garuda', 'Cinepolis Forum', 'PVR Phoenix Marketcity', 'INOX Mantri Square'] },
    { name: 'Mysuru', image: 'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vdmllfGVufDB8fDB8fHww', theatres: ['DRC Cinemas', 'INOX Mall of Mysore', 'Lakshmi Talkies'] },
    { name: 'Mangaluru', image: 'https://media.istockphoto.com/id/2185284225/photo/red-curtain-in-theatre-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=xC3inKyqZP0NDEiXmRrxg-j-IqcLBfu_sspSiVIvGc0=', theatres: ['PVR Forum Fiza', 'Big Cinemas Bharat', 'Prabhat Talkies'] },
    { name: 'Hubballi', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop', theatres: ['INOX Urban Oasis', 'Cinepolis Urban Oasis', 'Basveshwar Talkies'] },
    // { name: 'Belagavi', image: 'https://images.unsplash.com/photo-1549517045-bb4bd21c7ac4?q=80&w=1200&auto=format&fit=crop', theatres: ['INOX Nexus', 'Big Cinemas', 'Santosh Theatre'] },
    { name: 'Ballari', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop', theatres: ['PVR Rainbow', 'Sangeet Theatre', 'Venkatramana Theatre'] },
    { name: 'Shivamogga', image: 'https://images.unsplash.com/photo-1498550744921-75f79806b8a7?q=80&w=1200&auto=format&fit=crop', theatres: ['PVR Shivamogga', 'Urvashi Theatre', 'Harsha Theatre'] },
    { name: 'Davanagere', image: 'https://images.unsplash.com/photo-1499428665502-503f6c608263?q=80&w=1200&auto=format&fit=crop', theatres: ['Uma Talkies', 'Nataraj Theatre', 'PVR City Center'] }
  ];
  selectedLocation: LocationArea | null = null;
  selectedLocationName: string = '';
  
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
      showtimes: [
        { time: '10:45 AM', theater: 'Screen 11', price: 190 },
        { time: '2:45 PM', theater: 'Screen 11', price: 230 },
        { time: '6:45 PM', theater: 'Screen 11', price: 270 }
      ]
    }
  ];

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId?: any) {}

  ngOnInit() {
    this.filterMovies();
  }

  filterMovies() {
    if (this.selectedLanguage === 'All') {
      this.filteredMovies = this.movies;
    } else {
      this.filteredMovies = this.movies.filter(movie => movie.language === this.selectedLanguage);
    }
  }

  onLanguageChange() {
    this.filterMovies();
  }

  selectMovie(movie: Movie) {
    // Navigate to booking page with selected movie
    this.router.navigate(['/booking'], { 
      queryParams: { movieId: movie.movieId } 
    });
  }

  selectLocation(location: LocationArea) {
    this.selectedLocation = location;
    this.selectedLocationName = location.name;
  }

  clearSelectedLocation() {
    this.selectedLocation = null;
    this.selectedLocationName = '';
  }

  onLocationDropdownChange() {
    const found = this.locations.find(l => l.name === this.selectedLocationName) || null;
    this.selectedLocation = found;
  }

  addNewMovie() {
    // Navigate to add movie form (you can implement this later)
    console.log('Add new movie functionality');
  }

  editMovie(movie: Movie) {
    // Navigate to edit movie form (you can implement this later)
    console.log('Edit movie:', movie.title);
  }

  deleteMovie(movie: Movie) {
    // Delete movie functionality (you can implement this later)
    if (confirm(`Are you sure you want to delete ${movie.title}?`)) {
      console.log('Delete movie:', movie.title);
    }
  }

  scrollRight() {
    if (!this.platformId || !isPlatformBrowser(this.platformId)) return;
    const scrollContainer = document.querySelector('.movie-scroll') as HTMLElement | null;
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: 220, behavior: 'smooth' });
    }
  }

  onBannerClick(event: Event) {
    // Handle promotion click - open promotions page or log
    console.log('Promotion banner clicked', event);
  }
}
