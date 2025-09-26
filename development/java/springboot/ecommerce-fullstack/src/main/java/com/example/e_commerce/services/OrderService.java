package com.example.e_commerce.services;

import com.example.e_commerce.Entries.*;
import com.example.e_commerce.dto.PlaceOrderRequest;
import com.example.e_commerce.repo.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserAddressRepository userAddressRepository;
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private BankRepository bankRepository;

    // Get all
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    // Get by ID
    public Order getById(int id) {
        return orderRepository.findById(id).orElse(null);
    }

    // Create
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Transactional
    public Order placeOrder(PlaceOrderRequest request) {

        // 1. Fetch user and address
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        UserAddress address = userAddressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address Not Found"));

        // 2. Fetch linked bank account
        Bank bank = (Bank) bankRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("No bank account linked to user"));

        // 3. Prepare order and calculate total
        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(address);
        order.setOrderName("Order for user " + user.getName());

        double total = 0.0;
        List<Ordered> orderedItems = new ArrayList<>();

        for (PlaceOrderRequest.ItemRequest itemReq : request.getItems()) {
            Product product = productRepo.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product Not Found"));

            if (product.getQuantity() < itemReq.getQuantity()) {
                throw new RuntimeException("Not enough stock for " + product.getProductName());
            }

            Ordered orderedItem = new Ordered();
            orderedItem.setOrder(order);
            orderedItem.setProduct(product);
            orderedItem.setQuantity(itemReq.getQuantity());
            orderedItem.setRating(product.getRating());
            orderedItem.setPrice(product.getPrice() * itemReq.getQuantity());

            orderedItems.add(orderedItem);
            total += orderedItem.getPrice();
        }

        order.setOrderedItems(orderedItems);
        order.setTotalAmount(total);

        // 4. Payment logic
        if (bank.getBalance() >= total) {
            bank.setBalance(bank.getBalance() - total);
            bankRepository.save(bank);

            // Deduct stock only after payment succeeds
            for (Ordered item : orderedItems) {
                Product product = item.getProduct();
                product.setQuantity(product.getQuantity() - item.getQuantity());
                productRepo.save(product);
            }

            order.setStatus("Success");
            order.setPaymentStatus("Paid");
        } else {
            order.setStatus("Failed");
            order.setPaymentStatus("Failed");
        }

        // 5. Save and return order
        return orderRepository.save(order);
    }


    public List<Order> getOrdersByUser (int userId){
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User Not Found"));
        List<Order> orders = orderRepository.findByUser(user);

        return orders != null ? orders : Collections.emptyList();
    }



    // Update
//    public Order updateOrder(int id, Order orderDetails) {
//        return orderRepository.findById(id).map(order -> {
//            order.setUser(orderDetails.getUser());
//            order.setTotalAmount(orderDetails.getTotalPrice());
//            order.setOrderDate(orderDetails.getOrderDate());
//            return orderRepository.save(order);
//        }).orElse(null);
//    }

    // Delete
    public String deleteOrder(int id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return "Order deleted successfully!";
        } else {
            return "Order not found!";
        }
    }

    // Update Order Status
    public Order updateStatus(int orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        return orderRepository.save(order);
    }

    //  Cancel Order
    public Order cancelOrder(int orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Only allow cancel if Pending or Confirmed
        if (!order.getStatus().equalsIgnoreCase("Pending") &&
                !order.getStatus().equalsIgnoreCase("Confirmed")) {
            throw new RuntimeException("Cannot cancel order once shipped/delivered");
        }

        // Restore stock
        order.getOrderedItems().forEach(ordered -> {
            Product product = ordered.getProduct();
            product.setQuantity(product.getQuantity() + ordered.getQuantity());
            productRepo.save(product);
        });

        order.setStatus("Cancelled");
        return orderRepository.save(order);
    }



}
