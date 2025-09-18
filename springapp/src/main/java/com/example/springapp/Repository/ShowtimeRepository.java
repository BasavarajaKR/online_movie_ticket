package com.example.springapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.Model.Showtime;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    // Custom query methods can be added here if needed
    // For example:
    // List<Showtime> findByMovieId(Long movieId);
    // List<Showtime> findByTheatreId(Long theatreId);
    // List<Showtime> findByShowDate(LocalDate showDate);
    // List<Showtime> findByShowTime(LocalTime showTime);
}
