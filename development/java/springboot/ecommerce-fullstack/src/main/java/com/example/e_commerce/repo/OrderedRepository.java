package com.example.e_commerce.repo;

import com.example.e_commerce.Entries.Ordered;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderedRepository extends JpaRepository<Ordered,Integer> {
}
