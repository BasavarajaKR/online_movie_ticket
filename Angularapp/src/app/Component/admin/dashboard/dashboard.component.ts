import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';
import { User } from '../../../Model/user.model';
import { Observable } from 'rxjs';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminLayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
    console.log('DashboardComponent: Initializing...');
    this.isAuthenticated$.subscribe((isAuth: boolean) => {
      console.log('DashboardComponent: Authentication status:', isAuth);
      if (!isAuth) {
        console.log('DashboardComponent: Not authenticated, redirecting to login');
        this.router.navigate(['/admin/login']);
      } else {
        console.log('DashboardComponent: Authenticated, showing dashboard');
      }
    });
  }

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
}
