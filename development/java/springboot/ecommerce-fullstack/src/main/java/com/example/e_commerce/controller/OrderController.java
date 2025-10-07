package com.example.e_commerce.controller;

import com.example.e_commerce.Entries.Order;
import com.example.e_commerce.dto.PlaceOrderRequest;
import com.example.e_commerce.repo.OrderRepo;
import com.example.e_commerce.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:63342")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public List<Order> getAll() {
        return orderService.getAll();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable int id) {
        return orderService.getById(id);
    }

    @PostMapping("/add")
    public Order addOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody PlaceOrderRequest request) {
        Order order = orderService.placeOrder(request);
        return ResponseEntity.ok(order);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteOrder(@PathVariable int id) {
        return orderService.deleteOrder(id);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable int userId) {
        return orderService.getOrdersByUser(userId);
    }

    // Update Order Status
    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable int orderId, @RequestParam String status) {
        Order updatedOrder = orderService.updateStatus(orderId, status);
        return ResponseEntity.ok(updatedOrder);
    }

    // Cancel Order
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> cancelOrder(@PathVariable int orderId) {
        Order cancelledOrder = orderService.cancelOrder(orderId);
        return ResponseEntity.ok(cancelledOrder);
    }

    @Autowired
    private OrderRepo orderRepository;

    @GetMapping("/success")
    public ResponseEntity<List<Order>> getSuccessOrders() {
        List<Order> successOrders = orderRepository.findByStatus("Success");
        return ResponseEntity.ok(successOrders);
    }

    @GetMapping("/failed")
    public ResponseEntity<List<Order>> getFailedOrders() {
        List<Order> successOrders = orderRepository.findByStatus("Failed");
        return ResponseEntity.ok(successOrders);
    }
}
