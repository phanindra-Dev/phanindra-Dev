package com.example.e_commerce.controller;

import com.example.e_commerce.Entries.User;
import com.example.e_commerce.dto.PasswordResetRequest;
import com.example.e_commerce.dto.UserProfileDTO;
import com.example.e_commerce.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:63342", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    // Get all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getUsers();
    }

    // Add user / Signup
    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Update user
    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // Delete user
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
    }

    // Login
//    @PostMapping("/login")
//    public User loginUser(@RequestBody User user) {
//        return userService.login(user.getEmail(), user.getPassword());
//    }
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginUser, HttpSession session) {
        User user = userService.login(loginUser.getEmail(), loginUser.getPassword());
        if (user != null) {
            session.setAttribute("user", user);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().build();
    }


    // Fetch user profile
    @GetMapping("/profile/{userId}")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable int userId) {
        UserProfileDTO profile = userService.getUserProfile(userId);
        return ResponseEntity.ok(profile);
    }

    // Fetch user by ID (for session persistence)
    @GetMapping("/me/{userId}")
    public User getUserById(@PathVariable int userId) {
        return userService.getById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PutMapping("/reset-password")
    public ResponseEntity<Void> rp(@RequestBody PasswordResetRequest request) {
        userService.resetPassword(request.getEmail(),request.getNewPassword());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

//    @GetMapping("/checkSession")
//    public ResponseEntity<User> checkSession(HttpSession session) {
//        User user = (User) session.getAttribute("user");
//        if (user != null) {
//            return ResponseEntity.ok(user);
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//    }


}
