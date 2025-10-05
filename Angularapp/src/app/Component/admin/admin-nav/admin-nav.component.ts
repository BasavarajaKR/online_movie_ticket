import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';
import { User } from '../../../Model/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.getCurrentUser();
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }

  navigateTo(route: string): void {
    if (route === 'dashboard') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate([`/admin/${route}`]);
    }
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
