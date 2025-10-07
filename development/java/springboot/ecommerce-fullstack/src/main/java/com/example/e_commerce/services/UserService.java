package com.example.e_commerce.services;

import com.example.e_commerce.Entries.Order;
import com.example.e_commerce.Entries.User;
import com.example.e_commerce.dto.UserProfileDTO;
import com.example.e_commerce.repo.OrderRepo;
import com.example.e_commerce.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepo orderRepo;

    // Create user / Signup
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // Delete user
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    // Update user
    public User updateUser(int id, User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        if (!updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(updatedUser.getPassword());
        }

        return userRepository.save(existingUser);
    }

    // Login
    public User login(String email, String password) {
        User user = (User) userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!password.equals(user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;
    }

    // Get user by ID
    public Optional<User> getById(int userId) {
        return userRepository.findByUserId(userId);
    }

    // Get user profile with orders & address
    public UserProfileDTO getUserProfile(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Order> orders = orderRepo.findByUser_UserId(userId);

        UserProfileDTO profile = new UserProfileDTO();
        profile.setName(user.getName());
        profile.setEmail(user.getEmail());
        profile.setBanks(user.getBanks());
        profile.setPhoneNumber(user.getPhoneNumber());
        profile.setPastOrders(orders);

        if (!orders.isEmpty()) {
            profile.setAddress(
                    orders.get(0).getShippingAddress() != null
                            ? orders.get(0).getShippingAddress().getFullAddress()
                            : null
            );
        }
        return profile;
    }
}
