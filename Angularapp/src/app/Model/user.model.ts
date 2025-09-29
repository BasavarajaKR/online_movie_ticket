export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  isLoggedIn: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
