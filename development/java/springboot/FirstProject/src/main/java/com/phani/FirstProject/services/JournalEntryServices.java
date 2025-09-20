package com.phani.FirstProject.services;

import com.phani.FirstProject.Entires.JournalEntry;
import com.phani.FirstProject.Repo.JournalEntryRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class JournalEntryServices {
    @Autowired
    private JournalEntryRepo journalEntryRepo;

    public List<JournalEntry> getAll(){
        return journalEntryRepo.findAll();
    }

    public void create(JournalEntry entry){
        journalEntryRepo.save(entry);
    }

    public Optional<JournalEntry> getById(ObjectId myId) {
        return journalEntryRepo.findById(myId);
    }

    public void deleteById(ObjectId myId){
        journalEntryRepo.deleteById(myId);
    }

}
