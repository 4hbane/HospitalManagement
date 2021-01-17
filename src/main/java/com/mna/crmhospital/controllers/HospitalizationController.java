package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Bed;
import com.mna.crmhospital.entities.Hospitalization;
import com.mna.crmhospital.repositories.BedRepository;
import com.mna.crmhospital.repositories.HospitalizationRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api")
@AllArgsConstructor
public class HospitalizationController {

    private final HospitalizationRepository hospitalizationRepository;
    private final BedRepository bedRepository;

    @GetMapping("/hospitalisations")
    public List<Hospitalization> getHospitalizations() {
        return hospitalizationRepository.findAll();
    }

    @GetMapping("/hospitalisations/{id}")
    public Hospitalization getHospitalization(@PathVariable Long id) {
        Optional<Hospitalization> hospitalization = hospitalizationRepository.findById(id);
        return hospitalization.orElse(null);
    }

    // TODO(): TOFIX NOT WORKING.
    @PostMapping("/hospitalisations")
    public Hospitalization saveHospitalization(@RequestBody Hospitalization hospitalization) {
        hospitalization.setId(null);
        // TODO():
        //hospitalization.setDrugs(null);
        hospitalization.setBed(null);
        return hospitalizationRepository.save(hospitalization);
    }

    // NOTE(): Does not change bed / drugs
    // NOTE(): Drugs added to Hospitalization/Consultation must be - from DrugDB.
    @PutMapping("/hospitalisations/{id}")
    public Hospitalization updateHospitalization(@RequestBody Hospitalization hospitalization, @PathVariable Long id) {
        if(hospitalizationRepository.existsById(id) && hospitalization.getId().equals(id)) {
            Hospitalization oldHospitalization = hospitalizationRepository.findById(id).get();
            // TODO():
            //hospitalization.setDrugs(oldHospitalization.getDrugs());
            hospitalization.setBed(oldHospitalization.getBed());
            return hospitalizationRepository.save(hospitalization);
        }
        return null;
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
            return hospitalizationRepository.save(hospitalization);
        }
        return null;
    }

    //TODO(): More controllers needed.

}