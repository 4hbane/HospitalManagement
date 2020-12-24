package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.Bed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BedRepository extends JpaRepository<Bed, Long> {
    List<Bed> findAllByIsOccupied(boolean isOccupied);
    Long countAllByIsOccupied(boolean isOccupied);
}
