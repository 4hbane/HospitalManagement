package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findAllByDrugName(String name);
}
