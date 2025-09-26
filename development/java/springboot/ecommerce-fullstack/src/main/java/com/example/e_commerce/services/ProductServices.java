package com.example.e_commerce.services;

import com.example.e_commerce.Entries.Product;
import com.example.e_commerce.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductServices {
    @Autowired
    public ProductRepo productRepo;

    public List<Product> getProducts(){
        return productRepo.findAll();
    }

    public List<Product> saveProducts(List<Product> products){
        return productRepo.saveAll(products);
    }

    public List<Product> searchByName(String name) {
        return productRepo.findByProductNameContainingIgnoreCase(name);
    }

    public List<Product> searchByCategory(String category) {
        return productRepo.findByCategoryIgnoreCase(category);
    }

    public List<Product> searchByPriceRange(double min, double max) {
        return productRepo.findByPriceBetween(min, max);
    }

    public List<Product> searchByCategoryAndPrice(String category, double min, double max) {
        return productRepo.findByCategoryIgnoreCaseAndPriceBetween(category, min, max);
    }
    public void deleteById(int id){
        productRepo.deleteById(id);
    }

}
