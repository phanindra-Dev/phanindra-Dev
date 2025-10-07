package com.example.e_commerce.controller;

import com.example.e_commerce.Entries.Product;
import com.example.e_commerce.services.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:63342")

public class ProductController {
    @Autowired
    private ProductServices productService;

    @GetMapping("/all")
    public List<Product> getAllUsers() {
        return productService.getProducts();
    }

    @PostMapping("/create")
    public List<Product> addAllProducts(@RequestBody List<Product> products) {
        return productService.saveProducts(products);
    }


    // Search by name
    @GetMapping("/search/name")
    public List<Product> searchByName(@RequestParam String name) {
        return productService.searchByName(name);
    }

    // Search by category
    @GetMapping("/search/category")
    public List<Product> searchByCategory(@RequestParam String category) {
        return productService.searchByCategory(category);
    }

    // Search by price range
    @GetMapping("/search/price")
    public List<Product> searchByPriceRange( @RequestParam double min, @RequestParam double max) {
        return productService.searchByPriceRange(min, max);
    }

    // Search by category + price
    @GetMapping("/search/category-price")
    public List<Product> searchByCategoryAndPrice( @RequestParam String category, @RequestParam double min, @RequestParam double max) {
        return productService.searchByCategoryAndPrice(category, min, max);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id){
        try {
            productService.deleteById(id);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Product not found with id: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting product");
        }
    }

}
