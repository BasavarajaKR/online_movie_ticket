package com.example.springapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.Model.Theatre;

@Repository
public interface TheatreRepository extends JpaRepository<Theatre, Long> {
    // Custom query methods can be added here if needed
    // For example:
    // List<Theatre> findByNameContaining(String name);
    // List<Theatre> findByCity(String city);
    // List<Theatre> findByLocation(String location);
}
