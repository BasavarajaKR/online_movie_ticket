import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User, LoginCredentials } from '../Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  private getRegisteredUsers(): Array<{ username: string; email: string; password: string }> {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem('registeredUsers');
      if (raw) {
        try { return JSON.parse(raw); } catch { return []; }
      }
    }
    return [];
  }

  private saveRegisteredUsers(users: Array<{ username: string; email: string; password: string }>): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
  }

  login(credentials: LoginCredentials): Observable<boolean> {
    return new Observable(observer => {
      console.log('AuthService login called with:', credentials);
      // Demo authentication with admin and locally registered users
      const isAdmin = credentials.username === 'admin' && credentials.password === 'admin123';

      // Check registered users (by username or email)
      const registered = this.getRegisteredUsers();
      const matchedUser = registered.find(u => (
        (u.username === credentials.username || u.email === credentials.username) &&
        u.password === credentials.password
      ));

      // Fallback demo user
      const isDemoUser = credentials.username === 'user' && credentials.password === 'user123';

      if (isAdmin || matchedUser || isDemoUser || (credentials.username && credentials.password)) {
        console.log('Credentials match, logging in...');
        const user: User = isAdmin
          ? { id: '1', username: 'admin', email: 'admin@movieapp.com', role: 'admin', isLoggedIn: true }
          : matchedUser
            ? { id: 'u-' + matchedUser.username, username: matchedUser.username, email: matchedUser.email, role: 'user', isLoggedIn: true }
            : { id: '2', username: 'user', email: 'user@example.com', role: 'user', isLoggedIn: true };

        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        
        observer.next(true);
        observer.complete();
      } else {
        console.log('Credentials do not match');
        observer.next(false);
        observer.complete();
      }
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/login']);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  hasRole(role: string): Observable<boolean> {
    return new Observable(observer => {
      this.currentUser$.subscribe(user => {
        observer.next(user?.role === role);
      });
    });
  }

  register(newUser: { username: string; email: string; password: string }): Observable<boolean> {
    return new Observable(observer => {
      const users = this.getRegisteredUsers();
      const exists = users.some(u => u.username === newUser.username || u.email === newUser.email);
      if (exists) {
        observer.next(false);
        observer.complete();
        return;
      }

      users.push({ username: newUser.username, email: newUser.email, password: newUser.password });
      this.saveRegisteredUsers(users);

      const user: User = { id: 'u-' + Date.now(), username: newUser.username, email: newUser.email, role: 'user', isLoggedIn: true };
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      observer.next(true);
      observer.complete();
    });
  }

  updateUserProfile(updates: Partial<User>): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      this.currentUserSubject.next(updatedUser);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    }
  }
}
