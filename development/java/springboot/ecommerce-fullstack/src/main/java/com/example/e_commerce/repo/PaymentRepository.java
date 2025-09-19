package com.example.e_commerce.repo;

import com.example.e_commerce.Entries.Payment;
import com.example.e_commerce.Entries.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
