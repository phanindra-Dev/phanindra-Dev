package com.example.e_commerce.repo;

import com.example.e_commerce.Entries.cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface cartRepo extends JpaRepository<cart, Integer> {
    Optional<cart> findByUserUserId(int userId);
}
