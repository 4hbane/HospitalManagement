package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.Drug;
import com.mna.crmhospital.entities.DrugType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface DrugRepository extends JpaRepository<Drug, Long> {
    List<Drug> findDrugsByType(DrugType type);
    List<Drug> findDrugByExpirationDateBefore(Date date);
    Long countByName(String name);
    Long countByType(DrugType type);
}
