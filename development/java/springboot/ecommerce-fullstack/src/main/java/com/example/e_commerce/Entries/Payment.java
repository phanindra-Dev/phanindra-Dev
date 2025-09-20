package com.example.e_commerce.Entries;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;

    private LocalDateTime paymentDate = LocalDateTime.now();

    private double amount;
    private String paymentMethod;
    private String paymentStatus = "" ;

    // Many payments belong to one order
    @ManyToOne
    @JoinColumn(name = "order_id")//foreign Key
    private Order order;
}
