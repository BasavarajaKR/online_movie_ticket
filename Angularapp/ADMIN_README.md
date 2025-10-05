# Admin Panel for Movie Booking System

## Overview
This admin panel provides a comprehensive interface for managing the movie booking ticket system. It includes authentication, dashboard, and management features for movies, theatres, bookings, payments, and users.

## Features

### 🔐 Authentication
- **Admin Login**: Secure login with username/password
- **Session Management**: Persistent login sessions
- **Route Protection**: Guards to protect admin routes
- **Auto-redirect**: Automatic redirect to login if not authenticated

### 📊 Dashboard
- **Statistics Overview**: Key metrics and statistics
- **Recent Activity**: Real-time activity feed
- **Quick Navigation**: Easy access to all admin functions
- **Responsive Design**: Works on all device sizes

### 🎬 Movie Management
- View all movies
- Add new movies
- Edit existing movies
- Delete movies
- Manage movie details (title, description, duration, etc.)

### 🏢 Theatre Management
- View all theatres
- Add new theatres
- Edit theatre information
- Manage theatre locations and screens

### 🎫 Booking Management
- View all bookings
- Track booking status
- Manage booking details
- Handle booking cancellations

### 💳 Payment Management
- View payment transactions
- Track payment status
- Handle refunds
- Payment analytics

### 👥 User Management
- View all users
- Manage user accounts
- Handle user roles
- User activity tracking

## Getting Started

### Prerequisites
- Angular 20+
- Node.js
- npm or yarn

### Installation
1. Navigate to the Angular app directory:
   ```bash
   cd online_movie_ticket/Angularapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

## File Structure

```
src/app/Component/admin/
├── admin-layout/           # Reusable admin layout component
├── admin-nav/             # Navigation component
├── dashboard/             # Admin dashboard
├── login/                 # Admin login page
├── movie/                 # Movie management
├── theatre/               # Theatre management
├── booking/               # Booking management
├── payment/               # Payment management
└── user/                  # User management
```

## Components

### AdminLayoutComponent
- Provides consistent layout for all admin pages
- Includes navigation and authentication checks
- Handles loading states

### AdminNavComponent
- Navigation bar for admin pages
- User information display
- Logout functionality

### DashboardComponent
- Main admin dashboard
- Statistics and metrics
- Quick access to all features

### LoginComponent
- Admin authentication
- Form validation
- Error handling

## Services

### AuthService
- Handles authentication logic
- Manages user sessions
- Provides authentication state

### AdminGuard
- Protects admin routes
- Redirects unauthenticated users
- Ensures proper access control

## Styling
- Modern, responsive design
- Gradient backgrounds
- Card-based layouts
- Smooth animations and transitions
- Mobile-friendly interface

## Security Features
- Route guards for protection
- Session management
- Input validation
- Error handling

## Future Enhancements
- Real-time notifications
- Advanced analytics
- Bulk operations
- Export functionality
- Audit logs
- Role-based permissions

## Support
For any issues or questions, please contact the development team.
