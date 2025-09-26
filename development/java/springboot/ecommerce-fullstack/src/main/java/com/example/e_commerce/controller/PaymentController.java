package com.example.e_commerce.controller;

import com.example.e_commerce.Entries.Order;
import com.example.e_commerce.Entries.Payment;
import com.example.e_commerce.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/all")
    public List<Payment> getAll() {
        return paymentService.getAll();
    }

    @GetMapping("/{id}")
    public Payment getById(@PathVariable int id) {
        return paymentService.getById(id);
    }

    @PostMapping("/add")
    public Payment addPayment(@RequestBody Payment payment) {
        return paymentService.createPayment(payment);
    }

    @PutMapping("/update/{id}")
    public Payment updatePayment(@PathVariable int id, @RequestBody Payment payment) {
        return paymentService.updatePayment(id, payment);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePayment(@PathVariable int id) {
        return paymentService.deletePayment(id);
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<Order> payOrder(@PathVariable int id, @RequestParam String status) {
        Order order = paymentService.updatePaymentStatus(id, status);
        return ResponseEntity.ok(order);
    }

}
