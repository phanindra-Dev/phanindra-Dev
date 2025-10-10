package com.example.e_commerce.services;

import com.example.e_commerce.Entries.contact;
import com.example.e_commerce.repo.contactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class contactService {
    @Autowired
    private contactRepository contactRepository;

    public void create (contact contact){
        contactRepository.save(contact);
    }
}
