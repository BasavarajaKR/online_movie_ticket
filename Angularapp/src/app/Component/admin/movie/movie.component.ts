import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';

interface AdminMovie {
  id: number;
  title: string;
  genre: string;
  durationMinutes: number;
  poster?: string;
}

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminLayoutComponent],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: AdminMovie[] = [
    { id: 1, title: 'Avengers: Endgame', genre: 'Action, Adventure', durationMinutes: 181, poster: '' },
    { id: 2, title: 'Dune', genre: 'Sci‑Fi, Drama', durationMinutes: 155, poster: '' }
  ];

  showAddForm = false;
  editingMovieId: number | null = null;

  newMovie: Partial<AdminMovie> = {
    title: '',
    genre: '',
    durationMinutes: 120,
    poster: ''
  };

  ngOnInit(): void {}

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (this.showAddForm) {
      this.editingMovieId = null;
      this.newMovie = { title: '', genre: '', durationMinutes: 120, poster: '' };
    }
  }

  saveMovie(): void {
    if (!this.newMovie.title || !this.newMovie.genre || !this.newMovie.durationMinutes) return;

    if (this.editingMovieId) {
      const idx = this.movies.findIndex(m => m.id === this.editingMovieId);
      if (idx > -1) {
        this.movies[idx] = {
          id: this.editingMovieId,
          title: this.newMovie.title!,
          genre: this.newMovie.genre!,
          durationMinutes: Number(this.newMovie.durationMinutes),
          poster: this.newMovie.poster || ''
        };
      }
    } else {
      const nextId = (this.movies.at(-1)?.id || 0) + 1;
      this.movies.push({
        id: nextId,
        title: this.newMovie.title!,
        genre: this.newMovie.genre!,
        durationMinutes: Number(this.newMovie.durationMinutes),
        poster: this.newMovie.poster || ''
      });
    }

    this.toggleAddForm();
  }

  editMovie(movie: AdminMovie): void {
    this.showAddForm = true;
    this.editingMovieId = movie.id;
    this.newMovie = { ...movie };
  }

  deleteMovie(movie: AdminMovie): void {
    if (!confirm(`Delete movie "${movie.title}"?`)) return;
    this.movies = this.movies.filter(m => m.id !== movie.id);
  }
}
