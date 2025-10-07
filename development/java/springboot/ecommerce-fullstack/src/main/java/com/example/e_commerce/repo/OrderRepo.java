package com.example.e_commerce.repo;

import com.example.e_commerce.Entries.Order;
import com.example.e_commerce.Entries.Product;
import com.example.e_commerce.Entries.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order,Integer> {

    List<Order> findByUser_UserId(int userId);

    List<Order> findByUser(User user);

    List<Order> findByStatus(String status);

}
