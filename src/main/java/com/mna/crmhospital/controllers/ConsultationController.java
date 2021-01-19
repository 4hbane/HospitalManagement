package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Consultation;
import com.mna.crmhospital.entities.Drug;
import com.mna.crmhospital.entities.DrugVisit;
import com.mna.crmhospital.repositories.ConsultationRepository;
import com.mna.crmhospital.repositories.DrugRepository;
import com.mna.crmhospital.repositories.DrugVisitRepository;
import com.mna.crmhospital.services.InventoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api")
@AllArgsConstructor
public class ConsultationController {
    private final ConsultationRepository consultationRepository;
    private final DrugVisitRepository drugVisitRepository;
    private final InventoryService inventoryService;

    @GetMapping("/consultations")
    public List<Consultation> getConsultations() {
        return consultationRepository.findAll();
    }

    @GetMapping("/consultations/{id}")
    public Consultation getConsultation(@PathVariable Long id) {
        Optional<Consultation> consultation = consultationRepository.findById(id);
        return consultation.orElse(null);
    }

    //NOTE(): Doesn't change drugs.
    //NOTE(): Must be changed in DrugDB.
    @PostMapping("/consultations")
    public Consultation saveConsultation(@RequestBody Consultation consultation) {
        consultation.setId(null);
        return consultationRepository.save(consultation);
    }

    //NOTE(): Doesn't change drugs.
    //NOTE(): Must be changed in DrugDB.
    @PutMapping("/consultations/{id}")
    public Consultation updateConsultation(@RequestBody Consultation consultation, @PathVariable Long id) {
        if(consultationRepository.existsById(id) && consultation.getId().equals(id)) {
            return consultationRepository.save(consultation);
        }
        return null;
    }

    @PutMapping("/consultations/{id}/ajoutermed/{name}/{quantity}")
    public Consultation addDrugToConsultation(@PathVariable Long id, @PathVariable String name, @PathVariable int quantity) throws Exception {
        Drug d = inventoryService.deleteInventoryEntires(name, quantity).get(0).getDrug();
        Consultation c = null;
        if(consultationRepository.findById(id).isPresent()) {
            c = consultationRepository.findById(id).get();
            DrugVisit dv = new DrugVisit(null, d.getId(), c.getId(), quantity);
            drugVisitRepository.save(dv);
        }
        return c;
    }

    // TODO(): Delete drug from consultation.



    // TODO(): More controllers needed.
}
