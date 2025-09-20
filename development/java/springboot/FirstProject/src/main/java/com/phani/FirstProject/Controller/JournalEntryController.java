package com.phani.FirstProject.Controller;
import java.util.*;
import com.phani.FirstProject.Entires.JournalEntry;
import com.phani.FirstProject.services.JournalEntryServices;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("journal")
public class JournalEntryController {

    @Autowired
    private JournalEntryServices journalEntryServices;

    @GetMapping("/get")
    public ResponseEntity<?> getAll(){
        List<JournalEntry> all = journalEntryServices.getAll();
        if(all!=null && !all.isEmpty()){
            return new ResponseEntity<>(all,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
    }


    @PostMapping("/post")
    public ResponseEntity<JournalEntry> createWEntry(@RequestBody JournalEntry myEntry){
        try{
            journalEntryServices.create(myEntry);
            return new ResponseEntity<>(myEntry,HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
    }


    @GetMapping("/id/{myId}")
    public ResponseEntity<JournalEntry> getElementById(@PathVariable ObjectId myId) {
        Optional<JournalEntry> journal = journalEntryServices.getById(myId);
        if(journal.isPresent()){
            return new ResponseEntity<>(journal.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @DeleteMapping("/delete/{myId}")
    public ResponseEntity<?> deleteEntry(@PathVariable ObjectId myId) {
        journalEntryServices.deleteById(myId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/put/{myId}")
    public JournalEntry putEntry(@PathVariable ObjectId myId, @RequestBody JournalEntry myEntry) {
        return null;
    }
}