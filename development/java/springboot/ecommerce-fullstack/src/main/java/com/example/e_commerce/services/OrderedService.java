package com.example.e_commerce.services;

import com.example.e_commerce.Entries.Ordered;
import com.example.e_commerce.repo.OrderedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderedService {

    @Autowired
    private OrderedRepository orderedRepository;

    // Get all ordered items
    public List<Ordered> getAll() {
        return orderedRepository.findAll();
    }

    // Get by ID
    public Ordered getById(int id) {
        return orderedRepository.findById(id).orElse(null);
    }

    // Create
    public Ordered createOrdered(Ordered ordered) {
        return orderedRepository.save(ordered);
    }


    // Update
    public Ordered updateOrdered(int id, Ordered orderedDetails) {
        return orderedRepository.findById(id).map(ordered -> {
            ordered.setOrder(orderedDetails.getOrder());
            ordered.setProduct(orderedDetails.getProduct());
            ordered.setQuantity(orderedDetails.getQuantity());
            ordered.setRating(orderedDetails.getRating());
            ordered.setPrice(orderedDetails.getPrice());
            return orderedRepository.save(ordered);
        }).orElse(null);
    }

    // Delete
    public String deleteOrdered(int id) {
        if (orderedRepository.existsById(id)) {
            orderedRepository.deleteById(id);
            return "Ordered item deleted successfully!";
        } else {
            return "Ordered item not found!";
        }
    }
}
