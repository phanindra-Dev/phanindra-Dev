package com.example.e_commerce.controller;

import com.example.e_commerce.Entries.contact;
import com.example.e_commerce.services.contactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:63342", allowCredentials = "true")
public class contactController {
    @Autowired
    private contactService contactService;
    @PostMapping("/create")
    public ResponseEntity<contact> create(@RequestBody contact contact){
        contactService.create(contact);
        return ResponseEntity.status(OK).build();
    }
}
