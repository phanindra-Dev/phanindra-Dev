package com.example.e_commerce.controller;

import com.example.e_commerce.Entries.Order;
import com.example.e_commerce.Entries.Ordered;
import com.example.e_commerce.repo.OrderRepo;
import com.example.e_commerce.services.OrderedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ordered")
public class OrderedController {

    @Autowired
    private OrderedService orderedService;

    @GetMapping("/all")
    public List<Ordered> getAll() {
        return orderedService.getAll();
    }

    @GetMapping("/{id}")
    public Ordered getById(@PathVariable int id) {
        return orderedService.getById(id);
    }

    @PostMapping("/add")
    public Ordered addOrdered(@RequestBody Ordered ordered) {
        return orderedService.createOrdered(ordered);
    }

    @PutMapping("/update/{id}")
    public Ordered updateOrdered(@PathVariable int id, @RequestBody Ordered ordered) {
        return orderedService.updateOrdered(id, ordered);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteOrdered(@PathVariable int id) {
        return orderedService.deleteOrdered(id);
    }

}
