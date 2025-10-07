package com.example.e_commerce.controller;

import com.example.e_commerce.Entries.UserAddress;
import com.example.e_commerce.services.UserAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
@CrossOrigin(origins = "http://localhost:63342")
public class UserAddressController {

    @Autowired
    private UserAddressService userAddressService;

    @GetMapping("/all")
    public List<UserAddress> getAll() {
        return userAddressService.getAll();
    }

    @GetMapping("/{id}")
    public UserAddress getById(@PathVariable int id) {
        return userAddressService.getById(id);
    }

    @PostMapping("/add")
    public UserAddress addAddress(@RequestBody UserAddress address) {
        return userAddressService.createAddress(address);
    }

    @PutMapping("/update/{id}")
    public UserAddress updateAddress(@PathVariable int id, @RequestBody UserAddress address) {
        return userAddressService.updateAddress(id, address);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAddress(@PathVariable int id) {
        return userAddressService.deleteAddress(id);
    }
}
