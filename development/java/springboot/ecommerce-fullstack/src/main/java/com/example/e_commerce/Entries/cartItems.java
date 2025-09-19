package com.example.e_commerce.Entries;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "cart_items")
@Data
public class cartItems {

    @Id
    @JsonProperty("cartItemId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartItemId;

    private int quantity;

    // Each CartItem belongs to one Cart
    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private cart cart;

    // Each CartItem refers to a Product
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private double price;  // product price * quantity
}
