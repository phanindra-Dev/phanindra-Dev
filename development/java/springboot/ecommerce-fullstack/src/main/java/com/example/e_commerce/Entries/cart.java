package com.example.e_commerce.Entries;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
@Data

public class cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartId;

    // One cart belongs to one user
    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    // One cart has many cart items
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<cartItems> cartItems = new ArrayList<>();

    private double totalPrice = 0.0;
}
