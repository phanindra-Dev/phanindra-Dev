package com.example.e_commerce.controller;

import com.example.e_commerce.Entries.cart;
import com.example.e_commerce.services.cartServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:63342")
public class CartController {

    @Autowired
    private cartServices cartService;

    @PostMapping("/add")
    public cart addProductToCart(@RequestParam int userId,
                                 @RequestParam int productId,
                                 @RequestParam int quantity) {
        return cartService.addProductToCart(userId, productId, quantity);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public cart removeProductFromCart(@PathVariable int cartItemId) {
        return cartService.removeProductFromCart(cartItemId);
    }

    @PutMapping("/update/{cartItemId}")
    public cart updateQuantity(@PathVariable int cartItemId,
                               @RequestParam int quantity) {
        return cartService.updateQuantity(cartItemId, quantity);
    }

    @GetMapping("/view/{userId}")
    public cart viewCart(@PathVariable int userId) {
        return cartService.viewCart(userId);
    }
    @GetMapping("/total/{userId}")
    public double totalPrice(@PathVariable int userId){
        return cartService.getTotalPriceByUserId(userId);
    }
}
