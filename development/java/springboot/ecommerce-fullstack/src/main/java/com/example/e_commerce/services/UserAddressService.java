package com.example.e_commerce.services;

import com.example.e_commerce.Entries.UserAddress;
import com.example.e_commerce.repo.UserAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAddressService {

    @Autowired
    private UserAddressRepository userAddressRepository;

    // Get all
    public List<UserAddress> getAll() {
        return userAddressRepository.findAll();
    }

    // Get by ID
    public UserAddress getById(int id) {
        return userAddressRepository.findById(id).orElse(null);
    }

    // Create
    public UserAddress createAddress(UserAddress address) {
        return userAddressRepository.save(address);
    }

    // Update
    public UserAddress updateAddress(int id, UserAddress addressDetails) {
        return userAddressRepository.findById(id).map(address -> {
            address.setUser(addressDetails.getUser());
            address.setAddressLine1(addressDetails.getAddressLine1());
            address.setAddressLine2(addressDetails.getAddressLine2());
            address.setCity(addressDetails.getCity());
            address.setState(addressDetails.getState());
            address.setZipCode(addressDetails.getZipCode());
            address.setCountry(addressDetails.getCountry());
            return userAddressRepository.save(address);
        }).orElse(null);
    }

    // Delete
    public String deleteAddress(int id) {
        if (userAddressRepository.existsById(id)) {
            userAddressRepository.deleteById(id);
            return "Address deleted successfully!";
        } else {
            return "Address not found!";
        }
    }
}
