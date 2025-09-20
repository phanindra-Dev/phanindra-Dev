package com.example.e_commerce.repo;

import com.example.e_commerce.Entries.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Integer> {
    // Search by product name (contains, case insensitive)
    List<Product> findByProductNameContainingIgnoreCase(String name);

    // Search by category
    List<Product> findByCategoryIgnoreCase(String category);

    // Search by price range
    List<Product> findByPriceBetween(double minPrice, double maxPrice);

    // Combine category + price range
    List<Product> findByCategoryIgnoreCaseAndPriceBetween(String category, double minPrice, double maxPrice);
}
