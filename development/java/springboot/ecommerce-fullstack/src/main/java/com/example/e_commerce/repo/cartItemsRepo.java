package com.example.e_commerce.repo;

import com.example.e_commerce.Entries.cartItems;
import org.springframework.data.jpa.repository.JpaRepository;

public interface cartItemsRepo extends JpaRepository<cartItems, Integer> {
}
