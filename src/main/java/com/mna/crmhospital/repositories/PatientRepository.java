package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient findByMedicalFolderNumber(Long number);
}
