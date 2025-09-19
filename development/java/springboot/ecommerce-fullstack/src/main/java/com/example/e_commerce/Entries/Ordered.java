package com.example.e_commerce.Entries;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ordered")
@Data
public class Ordered {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderedId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;
    private int rating;
    private double price;
}
