package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Bed;
import com.mna.crmhospital.entities.Hospitalization;
import com.mna.crmhospital.repositories.BedRepository;
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
    private final BedRepository bedRepository;

    @GetMapping("/hospitalisation/{id}")
    public Hospitalization getHospitalization(@PathVariable Long id) {
        Optional<Hospitalization> hospitalization = hospitalizationRepository.findById(id);
        return hospitalization.orElse(null);
    }

    @PostMapping("/hospitalisations")
    public Hospitalization saveHospitalization(@RequestBody Hospitalization hospitalization) {
        return hospitalizationRepository.save(hospitalization);
    }

    //Add Bed to Hospitalisation (or modify)
    @PutMapping("/ajoutLit/{id}")
    public Hospitalization addBed(@RequestBody Bed bed, @PathVariable Long id){
        Optional<Hospitalization> hospitalizationOptional = hospitalizationRepository.findById(id);
        if(hospitalizationOptional.isPresent()) {
        Hospitalization hospitalization = hospitalizationOptional.get();
        hospitalization.setBed(bed);
        bed.setIsOccupied(true);
        bedRepository.save(bed);
        return hospitalizationRepository.save(hospitalization); }
        return null;
    }

}
