package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}
