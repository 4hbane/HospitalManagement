package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Patient;
import com.mna.crmhospital.repositories.PatientRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api")
@AllArgsConstructor
public class PatientController {

    private final PatientRepository patientRepository;

    @GetMapping("/dossiersAdministratifs")
        public List<Patient> getFolders() {
        return patientRepository.findAll();
    }

    @GetMapping("/dossiersAdministratifs/{folderNumber}")
    public Patient getFolderById(@PathVariable Long folderNumber) {
        Optional<Patient> adminFolder = patientRepository.findById(folderNumber);
        return adminFolder.orElse(null);
    }

    @PostMapping("/dossiersAdministratifs")
    public Patient saveFolder(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @PutMapping("/dossiersAdministratifs/{folderNumber}")
    public Patient updateFolder(@RequestBody Patient patient, @PathVariable Long folderNumber) {
        if(patientRepository.existsById(folderNumber) && patient.getNumber().equals(folderNumber)) { //NOTE(): Avoid sending object with different id than passed in param.
            return patientRepository.save(patient);
        }
        return null;
    }

    @DeleteMapping("/dossiersAdministratifs/{folderNumber}")
    public void deleteFolder(@PathVariable Long folderNumber) {
        if (patientRepository.existsById(folderNumber))
            patientRepository.deleteById(folderNumber);
    }


}
