package com.example.springapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.Model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Custom query methods can be added here if needed
    // For example:
    // List<Booking> findByUserId(Long userId);
    // List<Booking> findByShowtimeId(Long showtimeId);
    // List<Booking> findByBookingDate(LocalDate bookingDate);
    // List<Booking> findByStatus(String status);
}
