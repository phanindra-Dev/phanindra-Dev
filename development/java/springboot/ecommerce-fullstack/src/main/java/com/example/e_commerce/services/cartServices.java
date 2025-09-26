package com.example.e_commerce.services;

import com.example.e_commerce.Entries.Product;
import com.example.e_commerce.Entries.User;
import com.example.e_commerce.Entries.cart;
import com.example.e_commerce.Entries.cartItems;
import com.example.e_commerce.repo.ProductRepo;
import com.example.e_commerce.repo.UserRepository;
import com.example.e_commerce.repo.cartItemsRepo;
import com.example.e_commerce.repo.cartRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service//business logic and make it as bean
@Transactional
public class cartServices {
    @Autowired
    private cartRepo cartRepository;

    @Autowired
    private cartItemsRepo cartItemRepository;

    @Autowired
    private ProductRepo productRepository;

    @Autowired
    private UserRepository userRepository;
    public cart addProductToCart(int userId, int productId, int quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        cart cart = cartRepository.findByUserUserId(userId).orElse(new cart());
        cart.setUser(user);

        // create cartItem
        cartItems item = new cartItems();
        item.setCart(cart);
        item.setProduct(product);
        item.setQuantity(quantity);
        item.setPrice(product.getPrice() * quantity);

        cart.getCartItems().add(item);

        // update total
        cart.setTotalPrice(cart.getTotalPrice() + item.getPrice());

        return cartRepository.save(cart);
    }

    // Remove product from cart
//    public cart removeProductFromCart(int cartItemId) {
//        cartItems item = cartItemRepository.findById(cartItemId)
//                .orElseThrow(() -> new RuntimeException("Item not found"));
//
//        cart cart = item.getCart();
//        cart.setTotalPrice(cart.getTotalPrice() - item.getPrice());
//
//        cart.getCartItems().remove(item);
//        cartItemRepository.delete(item);
//
//        return cartRepository.save(cart);
//    }

    public cart removeProductFromCart(int cartItemId) {
        cartItems item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        cart cart = item.getCart();
        cart.setTotalPrice(cart.getTotalPrice() - item.getPrice());

        // Remove from list and delete explicitly
        cart.getCartItems().remove(item);
        cartItemRepository.delete(item);  // ensures DB delete

        return cartRepository.save(cart);
    }



    // Update quantity
    public cart updateQuantity(int cartItemId, int quantity) {
        cartItems item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        double oldPrice = item.getPrice();
        item.setQuantity(quantity);
        item.setPrice(item.getProduct().getPrice() * quantity);

        cart cart = item.getCart();
        cart.setTotalPrice(cart.getTotalPrice() - oldPrice + item.getPrice());

        cartItemRepository.save(item);
        return cartRepository.save(cart);
    }

    // View cart by user
    public cart viewCart(int userId) {
        return cartRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user"));
    }

    public double getTotalPriceByUserId(int userId) {
        cart cart = cartRepository.findByUserUserId(userId).orElseThrow(() ->
                new RuntimeException("Cart not found for user"));
        return cart.getTotalPrice();
    }
}
