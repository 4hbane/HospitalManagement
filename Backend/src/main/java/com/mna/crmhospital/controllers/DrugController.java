package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Drug;
import com.mna.crmhospital.entities.DrugType;
import com.mna.crmhospital.repositories.DrugRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
@AllArgsConstructor
public class DrugController {

    private final DrugRepository drugRepository;

    @GetMapping("/medicaments")
    public List<Drug> getDrugs() { return drugRepository.findAll(); }

    @GetMapping("/medicaments/{id}")
    public Drug getDrug(@PathVariable Long id) {
        return drugRepository.findById(id).orElse(null);
    }

    @GetMapping("/medicaments/type/{type}")
    public List<Drug> getDrugsByType(@PathVariable DrugType type) {
        return drugRepository.findDrugsByType(type);
    }


    @PostMapping("/medicaments")
    public Drug saveDrug(@RequestBody Drug drug) {
        drug.setId(null);
        drug.setVisits(new ArrayList<>());
        drug.setInventories(new ArrayList<>());
        return drugRepository.save(drug);
    }

    @PutMapping("/medicaments/{id}")
    public Drug updateDrug(@RequestBody Drug drug, @PathVariable Long id) {
        if(drugRepository.existsById(id)) {
            drug.setId(id);
            return drugRepository.save(drug);
        }
        return null;
    }


    // TODO(): Remove if not used.
    @PutMapping("/medicaments/prix/{name}")
    public Boolean updateDrug(@RequestBody Drug drug, @PathVariable String name) {
        if(drugRepository.existsByName(name) & drug.getPrice() != 0 & drug.getPrice() != null) {
             drugRepository.updatePrice(name, drug.getPrice());
             return true;
        }
        return false;
    }

    @DeleteMapping("/medicaments/{id}")
    public void deleteDrug(@PathVariable Long id) {
        if(drugRepository.existsById(id))
            drugRepository.deleteById(id);
    }
}
