package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Hospitalization;
import com.mna.crmhospital.repositories.HospitalizationRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api")
@AllArgsConstructor
public class HospitalizationController {

    private final HospitalizationRepository hospitalizationRepository;

    @GetMapping("/hospitalisation/{id}")
    public Hospitalization getHospitalization(@PathVariable Long id) {
        Optional<Hospitalization> hospitalization = hospitalizationRepository.findById(id);
        return hospitalization.orElse(null);
    }

    @PostMapping("/hospitalisations")
    public Hospitalization saveHospitalization(@RequestBody Hospitalization hospitalization) {
        return hospitalizationRepository.save(hospitalization);
    }
}
