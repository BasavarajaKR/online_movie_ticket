import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    const isAuthenticated$ = this.authService.isAuthenticated().pipe(take(1));
    const isAdmin$ = this.authService.hasRole('admin').pipe(take(1));

    return combineLatest([isAuthenticated$, isAdmin$]).pipe(
      map(([isAuthenticated, isAdmin]) => {
        if (isAuthenticated && isAdmin) {
          return true;
        }
        this.router.navigate(['/admin/login']);
        return false;
      })
    );
  }
}
