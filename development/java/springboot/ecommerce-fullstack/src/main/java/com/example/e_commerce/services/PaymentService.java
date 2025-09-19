package com.example.e_commerce.services;

import com.example.e_commerce.Entries.Order;
import com.example.e_commerce.Entries.Payment;
import com.example.e_commerce.repo.OrderRepo;
import com.example.e_commerce.repo.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private OrderRepo orderRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    // Get all
    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    // Get by ID
    public Payment getById(int id) {
        return paymentRepository.findById(id).orElse(null);
    }

    // Create
    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    // Update
    public Payment updatePayment(int id, Payment paymentDetails) {
        return paymentRepository.findById(id).map(payment -> {
            payment.setOrder(paymentDetails.getOrder());
            payment.setAmount(paymentDetails.getAmount());
            payment.setPaymentDate(paymentDetails.getPaymentDate());
            payment.setPaymentMethod(paymentDetails.getPaymentMethod());
            return paymentRepository.save(payment);
        }).orElse(null);
    }

    // Delete
    public String deletePayment(int id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return "Payment deleted successfully!";
        } else {
            return "Payment not found!";
        }
    }


    public Order updatePaymentStatus(int orderId, String status) {
        Order order = orderRepository.findById(orderId) .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        if (status.equalsIgnoreCase("Success")) {
            order.setPaymentStatus("Success");
            order.setStatus("Confirmed");
        }
        else if (status.equalsIgnoreCase("Failed")) {
            order.setPaymentStatus("Failed");
            // Keep order status Pending
        }
        else {
            throw new RuntimeException("Invalid payment status. Use Success or Failed.");
        }

        return orderRepository.save(order);
    }


}
