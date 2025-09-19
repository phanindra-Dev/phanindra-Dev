package com.example.e_commerce.dto;
import lombok.Data;
import java.util.List;

@Data
public class PlaceOrderRequest {
    private int userId;
    private int addressId;
    private List<ItemRequest> items;

    @Data
    public static class ItemRequest {
        private int productId;
        private int quantity;
    }
}