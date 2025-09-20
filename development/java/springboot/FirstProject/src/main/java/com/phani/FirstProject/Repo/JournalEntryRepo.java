package com.phani.FirstProject.Repo;

import com.phani.FirstProject.Entires.JournalEntry;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

@Component
public interface JournalEntryRepo extends MongoRepository<JournalEntry, ObjectId> {

}
