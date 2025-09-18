package com.example.springapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Custom query methods can be added here if needed
    // For example:
    // Optional<User> findByEmail(String email);
    // Optional<User> findByUsername(String username);
    // List<User> findByRole(String role);
}
