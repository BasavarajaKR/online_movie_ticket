package com.example.springapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.Model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Custom query methods can be added here if needed
    // For example:
    // List<Customer> findByName(String name);
    // List<Customer> findByEmail(String email);
}