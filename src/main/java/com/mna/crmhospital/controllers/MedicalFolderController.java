package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Patient;
import com.mna.crmhospital.entities.Drug;
import com.mna.crmhospital.entities.Hospitalization;
import com.mna.crmhospital.entities.MedicalFolder;
import com.mna.crmhospital.repositories.PatientRepository;
import com.mna.crmhospital.repositories.DrugRepository;
import com.mna.crmhospital.repositories.HospitalizationRepository;
import com.mna.crmhospital.repositories.MedicalFolderRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api")
@AllArgsConstructor
public class MedicalFolderController {

    private final PatientRepository patientRepository;
    private final MedicalFolderRepository medicalFolderRepository;
    private final HospitalizationRepository hospitalizationRepository;
    private final DrugRepository drugRepository;

    @GetMapping("/dossiersMedicaux")
    public List<MedicalFolder> getFolders() {
        return medicalFolderRepository.findAll();
    }

    @GetMapping("/dossiersMedicaux/{folderNumber}")
    public MedicalFolder getFolder(@PathVariable Long folderNumber) {
        if(medicalFolderRepository.findById(folderNumber).isPresent()) {
            return medicalFolderRepository.findById(folderNumber).get();
        }
        return null;
    }

    @PostMapping("/dossiersMedicaux/{patientNumber}") // Adds a MedicalFolder to DB but managed ties with Patient.
    public MedicalFolder saveFolder(@RequestBody MedicalFolder medicalFolder, @PathVariable Long patientNumber) {
        Optional<Patient> patientOptional = patientRepository.findById(patientNumber);
        if(patientOptional.isPresent()) {
            Patient patient = patientOptional.get();
            medicalFolder.setPatientNumber(patientNumber);
            patient.setMedicalFolderNumber(medicalFolder.getPatientNumber());
            return medicalFolderRepository.save(medicalFolder);
        }
        return null;
    }

    @PutMapping("/dossiersMedicaux/{folderNumber}")
    public MedicalFolder updateFolder(@RequestBody MedicalFolder medicalFolder, @PathVariable Long folderNumber) {
        if(medicalFolderRepository.existsById(folderNumber) && medicalFolder.getFolderNumber().equals(folderNumber)) {
            Patient patient = patientRepository.findByMedicalFolderNumber(folderNumber);
            medicalFolder.setPatientNumber(patient.getNumber());
            return medicalFolderRepository.save(medicalFolder);
        }
        return null;
    }

    // Add hospitalization to medical folder.
    @PutMapping("/ajoutHospitalisation/{folderNumber}")
    public MedicalFolder addHospitalization(@RequestBody Hospitalization hospitalization, @PathVariable Long folderNumber) {
        Optional<MedicalFolder> medicalFolderOptional = medicalFolderRepository.findById(folderNumber);
        if(medicalFolderOptional.isPresent()) {
            MedicalFolder medicalFolder = medicalFolderOptional.get();
            medicalFolder.setHospitalized(true);
            medicalFolder.setHospitalization(hospitalization);
            hospitalization.setMedicalFolder(medicalFolder);
            hospitalizationRepository.save(hospitalization);
            return medicalFolderRepository.save(medicalFolder);
        }
        return null;
    }

    // Add drugs to medical folder.
    @PutMapping("/ajoutMedic/{folderNumber}")
    public MedicalFolder addDrug(@RequestBody Drug drug, @PathVariable Long folderNumber) {
        Optional<MedicalFolder> medicalFolderOptional = medicalFolderRepository.findById(folderNumber);
        if(medicalFolderOptional.isPresent()) {
            MedicalFolder medicalFolder = medicalFolderOptional.get();
            drug.setMedicalFolder(medicalFolder);
            drugRepository.save(drug);
            return medicalFolderRepository.save(medicalFolder);
        }
        return null;
    }
    // Delete a drug from medical folder.
    @PutMapping("/supprimerMedic/{folderNumber}")
    public MedicalFolder deleteDrug(@RequestBody Drug drug, @PathVariable Long folderNumber) {
        Optional<MedicalFolder> medicalFolderOptional = medicalFolderRepository.findById(folderNumber);
        if(medicalFolderOptional.isPresent()) {
            MedicalFolder medicalFolder = medicalFolderOptional.get();
            drug.setMedicalFolder(null);
            drugRepository.delete(drug);
            return medicalFolderRepository.save(medicalFolder);
        }
        return null;
    }

    @DeleteMapping("/dossiersMedicaux/{folderNumber}")
    public void deleteFolder(@PathVariable Long folderNumber) {
        // Remove medical folder from patient.
        Patient patient = patientRepository.findByMedicalFolderNumber(folderNumber); // NOTE(): Medical folder can't exist on it's own. No need to check for Patient availability.
        patient.setMedicalFolderNumber(null);
        medicalFolderRepository.deleteById(folderNumber);
    }
}
