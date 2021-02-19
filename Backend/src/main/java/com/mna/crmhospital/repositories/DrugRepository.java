package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.Drug;
import com.mna.crmhospital.entities.DrugType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface DrugRepository extends JpaRepository<Drug, Long> {

    Drug findDrugByName(String name);

    List<Drug> findDrugsByType(DrugType type);
    Boolean existsByName( String name);

    @Transactional
    @Modifying
    @Query("UPDATE Drug b  set b.price=:newPrice where b.name =:name")
    public void updatePrice(@Param(value = "name") String name, @Param("newPrice") Double newPrice);

}
