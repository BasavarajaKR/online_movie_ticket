import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';
import { User } from '../../../Model/user.model';
import { Observable } from 'rxjs';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, AdminNavComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.getCurrentUser();
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((isAuth: boolean) => {
      if (!isAuth) {
        this.router.navigate(['/admin/login']);
      }
    });
  }

  navigateTo(route: string): void {
    if (route === 'dashboard') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate([`/admin/${route}`]);
    }
  }
}
