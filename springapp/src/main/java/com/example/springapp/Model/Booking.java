package com.example.springapp.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    @NotNull(message = "User ID is required")
    private Long userId;
    
    @Column(nullable = false)
    @NotNull(message = "Showtime ID is required")
    private Long showtimeId;
    
    @Column(nullable = false)
    @NotNull(message = "Number of seats is required")
    private Integer numberOfSeats;
    
    @Column(nullable = false)
    private Double totalAmount;
    
    @Column(nullable = false)
    private String status; // PENDING, CONFIRMED, CANCELLED
    
    @Column(nullable = false)
    private LocalDateTime bookingDate;
    
    @Column
    private String seatNumbers; // Comma-separated seat numbers
    
    // Default constructor
    public Booking() {}
    
    // Constructor with parameters
    public Booking(Long userId, Long showtimeId, Integer numberOfSeats, Double totalAmount, String status, String seatNumbers) {
        this.userId = userId;
        this.showtimeId = showtimeId;
        this.numberOfSeats = numberOfSeats;
        this.totalAmount = totalAmount;
        this.status = status;
        this.seatNumbers = seatNumbers;
        this.bookingDate = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public Long getShowtimeId() {
        return showtimeId;
    }
    
    public void setShowtimeId(Long showtimeId) {
        this.showtimeId = showtimeId;
    }
    
    public Integer getNumberOfSeats() {
        return numberOfSeats;
    }
    
    public void setNumberOfSeats(Integer numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }
    
    public Double getTotalAmount() {
        return totalAmount;
    }
    
    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public LocalDateTime getBookingDate() {
        return bookingDate;
    }
    
    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }
    
    public String getSeatNumbers() {
        return seatNumbers;
    }
    
    public void setSeatNumbers(String seatNumbers) {
        this.seatNumbers = seatNumbers;
    }
    
    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", userId=" + userId +
                ", showtimeId=" + showtimeId +
                ", numberOfSeats=" + numberOfSeats +
                ", totalAmount=" + totalAmount +
                ", status='" + status + '\'' +
                ", bookingDate=" + bookingDate +
                ", seatNumbers='" + seatNumbers + '\'' +
                '}';
    }
}
