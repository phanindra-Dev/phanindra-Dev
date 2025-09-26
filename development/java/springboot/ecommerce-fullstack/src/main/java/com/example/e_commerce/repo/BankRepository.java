package com.example.e_commerce.repo;

import com.example.e_commerce.Entries.Bank;
import com.example.e_commerce.Entries.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BankRepository extends JpaRepository<Bank, Integer> {
    Bank findByUserUserId(int userId);

    Optional<Object> findByUser(User user);
}
