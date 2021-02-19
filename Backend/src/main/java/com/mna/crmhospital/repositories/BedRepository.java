package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.Bed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BedRepository extends JpaRepository<Bed, Long> {

    List<Bed> findAllByIsOccupied(boolean isOccupied);
    Long countAllByIsOccupied(boolean isOccupied);

    @Transactional
    @Modifying
    @Query("UPDATE Bed b  set b.pricePerDay=:newPricePerDay")
    public void updatePrice(@Param( "newPricePerDay" ) Double newPricePerDay);

}
