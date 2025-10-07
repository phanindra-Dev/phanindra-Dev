package com.example.e_commerce.dto;

import com.example.e_commerce.Entries.Bank;
import com.example.e_commerce.Entries.Order;
import lombok.Data;

import java.util.List;

@Data
public class UserProfileDTO {
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private List<Bank> banks;
    private List<Order> pastOrders;
}
