package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.AdminFolder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminFolderRepository extends JpaRepository<AdminFolder, Long> {
    AdminFolder findByMedicalFolderNumber(Long number);
}
