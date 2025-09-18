package com.example.springapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.Model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    // Custom query methods can be added here if needed
    // For example:
    // List<Movie> findByTitleContaining(String title);
    // List<Movie> findByGenre(String genre);
    // List<Movie> findByReleaseYear(int year);
}
