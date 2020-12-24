package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Drug;
import com.mna.crmhospital.entities.DrugType;
import com.mna.crmhospital.repositories.DrugRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
        Optional<Drug> drug = drugRepository.findById(id);
        return drug.orElse(null);
    }

    @GetMapping("/medicaments/type/{type}")
    public List<Drug> getDrugsByType(@PathVariable DrugType type) {
        return drugRepository.findDrugsByType(type);
    }

    @GetMapping("/medicamentsexpire")
    public List<Drug> getExpiredDrugs() {
        return drugRepository.findDrugByExpirationDateBefore(new Date());
    }

    @GetMapping("/medicaments/nombre/   {name}")
    public Long getCountByName(@PathVariable String name) {
        return drugRepository.countByName(name);
    }

    @GetMapping("/medicaments/nombre/type/{type}")
    public Long getCountByType(@PathVariable DrugType type) {
        return drugRepository.countByType(type);
    }

    @PostMapping("/medicaments")
    public Drug saveDrug(@RequestBody Drug drug) {
        drug.setId(null);
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

    @DeleteMapping("/medicaments/{id}")
    public void deleteDrug(@PathVariable Long id) {
        if(drugRepository.existsById(id))
            drugRepository.deleteById(id);
    }
}
