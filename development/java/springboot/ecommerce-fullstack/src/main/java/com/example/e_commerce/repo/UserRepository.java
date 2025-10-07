package com.example.e_commerce.repo;

import com.example.e_commerce.Entries.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmailAndPassword(String email, String password);
    Optional<User> findByName(String username);

    Optional<Object> findByEmail(String email);

    Optional<User> findByUserId(int userId);


}