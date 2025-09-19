package com.example.e_commerce.Entries;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_addresses")
@Data
public class UserAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int addressId;

    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String zipCode;
    private String country;

    // Many addresses belong to one user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // getters & setters
}
