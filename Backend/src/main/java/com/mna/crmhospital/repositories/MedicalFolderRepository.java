package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.Hospitalization;
import com.mna.crmhospital.entities.MedicalFolder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalFolderRepository extends JpaRepository<MedicalFolder, Long> {
}
