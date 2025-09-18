package com.example.springapp.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "showtimes")
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    @NotNull(message = "Movie ID is required")
    private Long movieId;
    
    @Column(nullable = false)
    @NotNull(message = "Theatre ID is required")
    private Long theatreId;
    
    @Column(nullable = false)
    private LocalDate showDate;
    
    @Column(nullable = false)
    private LocalTime showTime;
    
    @Column(nullable = false)
    private Integer availableSeats;
    
    @Column(nullable = false)
    private Double ticketPrice;
    
    @Column
    private String screenNumber;
    
    // Default constructor
    public Showtime() {}
    
    // Constructor with parameters
    public Showtime(Long movieId, Long theatreId, LocalDate showDate, LocalTime showTime, Integer availableSeats, Double ticketPrice, String screenNumber) {
        this.movieId = movieId;
        this.theatreId = theatreId;
        this.showDate = showDate;
        this.showTime = showTime;
        this.availableSeats = availableSeats;
        this.ticketPrice = ticketPrice;
        this.screenNumber = screenNumber;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getMovieId() {
        return movieId;
    }
    
    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }
    
    public Long getTheatreId() {
        return theatreId;
    }
    
    public void setTheatreId(Long theatreId) {
        this.theatreId = theatreId;
    }
    
    public LocalDate getShowDate() {
        return showDate;
    }
    
    public void setShowDate(LocalDate showDate) {
        this.showDate = showDate;
    }
    
    public LocalTime getShowTime() {
        return showTime;
    }
    
    public void setShowTime(LocalTime showTime) {
        this.showTime = showTime;
    }
    
    public Integer getAvailableSeats() {
        return availableSeats;
    }
    
    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }
    
    public Double getTicketPrice() {
        return ticketPrice;
    }
    
    public void setTicketPrice(Double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }
    
    public String getScreenNumber() {
        return screenNumber;
    }
    
    public void setScreenNumber(String screenNumber) {
        this.screenNumber = screenNumber;
    }
    
    @Override
    public String toString() {
        return "Showtime{" +
                "id=" + id +
                ", movieId=" + movieId +
                ", theatreId=" + theatreId +
                ", showDate=" + showDate +
                ", showTime=" + showTime +
                ", availableSeats=" + availableSeats +
                ", ticketPrice=" + ticketPrice +
                ", screenNumber='" + screenNumber + '\'' +
                '}';
    }
}
