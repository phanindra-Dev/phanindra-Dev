package com.example.e_commerce.dto;

import com.example.e_commerce.Entries.UserAddress;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
public class UserAddressDTO {

    private int addressId;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private int userId;
    private String fullAddress;

    public UserAddressDTO(UserAddress userAddress) {
        this.addressId = userAddress.getAddressId();
        this.addressLine1 = userAddress.getAddressLine1();
        this.addressLine2 = userAddress.getAddressLine2();
        this.city = userAddress.getCity();
        this.state = userAddress.getState();
        this.zipCode = userAddress.getZipCode();
        this.country = userAddress.getCountry();
        this.userId = userAddress.getUser().getUserId();
        this.fullAddress = userAddress.getFullAddress();
    }
}
