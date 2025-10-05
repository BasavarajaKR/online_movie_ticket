import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLayoutComponent } from '../../admin-layout/admin-layout.component';

interface Theatre {
  id: number;
  name: string;
  place: string;
  screens: number;
  capacity: number;
  movies: string[];
}

@Component({
  selector: 'app-theatre',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminLayoutComponent],
  templateUrl: './theatre.html',
  styleUrls: ['./theatre.css']
})
export class TheatreComponent implements OnInit {
  theatres: Theatre[] = [
    {
      id: 1,
      name: 'Cineplex Downtown',
      place: '123 Main Street, Downtown',
      screens: 5,
      capacity: 500,
      movies: ['Avengers: Endgame', 'Spider-Man: No Way Home']
    },
    {
      id: 2,
      name: 'PVR Orion Mall',
      place: 'Orion Mall, Malleshwaram',
      screens: 8,
      capacity: 800,
      movies: ['Dune', 'The Batman']
    },
    {
      id: 3,
      name: 'INOX Garuda',
      place: 'Garuda Mall, Magrath Road',
      screens: 6,
      capacity: 600,
      movies: ['Baahubali 2', 'RRR']
    }
  ];

  showAddTheatreForm = false;
  showAddMovieForm = false;
  selectedTheatreId: number | null = null;
  newTheatre = {
    name: '',
    place: '',
    screens: 0,
    capacity: 0
  };
  newMovie = '';

  constructor() { }

  ngOnInit(): void {
  }

  toggleAddTheatreForm() {
    this.showAddTheatreForm = !this.showAddTheatreForm;
    if (this.showAddTheatreForm) {
      this.newTheatre = { name: '', place: '', screens: 0, capacity: 0 };
    }
  }

  toggleAddMovieForm(theatreId: number) {
    this.showAddMovieForm = !this.showAddMovieForm;
    this.selectedTheatreId = theatreId;
    this.newMovie = '';
  }

  addTheatre() {
    if (this.newTheatre.name && this.newTheatre.place) {
      const theatre: Theatre = {
        id: this.theatres.length + 1,
        name: this.newTheatre.name,
        place: this.newTheatre.place,
        screens: this.newTheatre.screens,
        capacity: this.newTheatre.capacity,
        movies: []
      };
      this.theatres.push(theatre);
      this.toggleAddTheatreForm();
    }
  }

  addMovieToTheatre() {
    if (this.newMovie && this.selectedTheatreId) {
      const theatre = this.theatres.find(t => t.id === this.selectedTheatreId);
      if (theatre) {
        theatre.movies.push(this.newMovie);
        this.newMovie = '';
        this.toggleAddMovieForm(0);
      }
    }
  }

  editTheatre(theatre: Theatre) {
    // Implement edit functionality
    console.log('Edit theatre:', theatre);
  }

  deleteTheatre(theatre: Theatre) {
    if (confirm(`Are you sure you want to delete ${theatre.name}?`)) {
      const index = this.theatres.findIndex(t => t.id === theatre.id);
      if (index > -1) {
        this.theatres.splice(index, 1);
      }
    }
  }

  removeMovieFromTheatre(theatreId: number, movieIndex: number) {
    const theatre = this.theatres.find(t => t.id === theatreId);
    if (theatre) {
      theatre.movies.splice(movieIndex, 1);
    }
  }
}
