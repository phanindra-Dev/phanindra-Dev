package com.example.e_commerce.controller;

import com.example.e_commerce.Entries.User;
import com.example.e_commerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getUsers();
    }

    @PostMapping("/add")
    public void addUser(@RequestBody User user) {
        userService.createUser(user);
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
    }

//    @PostMapping("/login")
//    public User loginUser(@RequestBody User user) {
//        return userService.getUsers().stream()
//                .filter(u -> u.getEmail().equals(user.getEmail())
//                        && u.getPassword().equals(user.getPassword()))
//                .findFirst()
//                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
//    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        return userService.login(user.getEmail(), user.getPassword());
    }

}
