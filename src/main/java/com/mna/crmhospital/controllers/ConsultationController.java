package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Consultation;
import com.mna.crmhospital.repositories.ConsultationRepository;
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

    @GetMapping("/consultations")
    public List<Consultation> getConsultations() {
        return consultationRepository.findAll();
    }

    @GetMapping("/consultations/{id}")
    public Consultation getConsultation(@PathVariable Long id) {
        Optional<Consultation> consultation = consultationRepository.findById(id);
        return consultation.orElse(null);
    }

    @PostMapping("/consultations/")
    public Consultation saveConsultation(@RequestBody Consultation consultation) {
        consultation.setId(null);
        return consultationRepository.save(consultation);
    }

    @PutMapping("/consultation/{id}")
    public Consultation updateConsultation(@RequestBody Consultation consultation, @PathVariable Long id) {
        if(consultationRepository.existsById(id) && consultation.getId().equals(id)) {
            return consultationRepository.save(consultation);
        }
        return null;
    }

    //TODO(): More controllers needed.
}
