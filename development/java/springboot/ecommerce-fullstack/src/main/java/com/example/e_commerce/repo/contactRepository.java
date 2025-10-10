package com.example.e_commerce.repo;

import com.example.e_commerce.Entries.cart;
import com.example.e_commerce.Entries.contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface contactRepository extends JpaRepository<contact, Integer> {
}
