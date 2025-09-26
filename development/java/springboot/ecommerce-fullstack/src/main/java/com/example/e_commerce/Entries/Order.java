package com.example.e_commerce.Entries;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    private String orderName;

    private LocalDateTime orderDate = LocalDateTime.now();

    private double totalAmount;

    private String status ;

    @Column(nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'Unpaid'")
    private String paymentStatus;

    @PrePersist
    public void prePersist() {
        if (paymentStatus == null) {
            paymentStatus = "Unpaid";
        }
    }

    // Many orders belong to one user
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore   // prevents infinite loop
    private User user;

    // Shipping address

    @ManyToOne
    @JoinColumn(name = "shipping_address_id")
    @JsonIgnoreProperties({"orders", "user"})
    private UserAddress shippingAddress;


    // One order has many ordered items
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Ordered> orderedItems;

}
