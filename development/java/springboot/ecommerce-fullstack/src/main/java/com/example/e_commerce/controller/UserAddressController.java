package com.example.e_commerce.controller;

import com.example.e_commerce.dto.UserAddressDTO;
import com.example.e_commerce.services.UserAddressService;
import com.example.e_commerce.Entries.UserAddress;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/addresses")
@CrossOrigin(origins = "http://localhost:63342")
public class UserAddressController {

    @Autowired
    private UserAddressService userAddressService;

    @Autowired
    private ModelMapper modelMapper;  // Assuming you're using ModelMapper for DTO mapping

    // Get all addresses
    @GetMapping("/all")
    public List<UserAddressDTO> getAll() {
        List<UserAddress> userAddresses = userAddressService.getAll();
        return userAddresses.stream()
                .map(userAddress -> modelMapper.map(userAddress, UserAddressDTO.class))
                .collect(Collectors.toList());
    }

    // Get address by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserAddressDTO> getById(@PathVariable int id) {
        UserAddress userAddress = userAddressService.getById(id);
        if (userAddress != null) {
            UserAddressDTO userAddressDTO = modelMapper.map(userAddress, UserAddressDTO.class);
            return ResponseEntity.ok(userAddressDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Add a new address
    @PostMapping("/add")
    public ResponseEntity<UserAddressDTO> addAddress(@RequestBody UserAddress address) {
        UserAddress savedAddress = userAddressService.createAddress(address);
        UserAddressDTO savedAddressDTO = modelMapper.map(savedAddress, UserAddressDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAddressDTO);
    }

    // Update an address
    @PutMapping("/update/{id}")
    public ResponseEntity<UserAddressDTO> updateAddress(@PathVariable int id, @RequestBody UserAddress address) {
        UserAddress updatedAddress = userAddressService.updateAddress(id, address);
        if (updatedAddress != null) {
            UserAddressDTO updatedAddressDTO = modelMapper.map(updatedAddress, UserAddressDTO.class);
            return ResponseEntity.ok(updatedAddressDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Delete an address
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable int id) {
        String result = userAddressService.deleteAddress(id);
        if (result.equals("Address deleted successfully!")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }
}
