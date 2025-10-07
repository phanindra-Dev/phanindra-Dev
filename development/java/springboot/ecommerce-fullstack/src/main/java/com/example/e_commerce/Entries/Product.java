package com.example.e_commerce.Entries;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    private String productName;
    private String productDetails;
    private int quantity;
    private int rating;
    private String imageUrl;
    private double price;
    private String category;
}
