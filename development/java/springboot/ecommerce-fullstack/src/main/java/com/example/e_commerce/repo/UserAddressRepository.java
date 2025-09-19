package com.example.e_commerce.repo;

import com.example.e_commerce.Entries.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAddressRepository extends JpaRepository<UserAddress,Integer> {
}
