package com.mna.crmhospital.services;


import com.mna.crmhospital.entities.Inventory;

import java.util.List;

public interface InventoryService {
    List<Inventory> deleteInventoryEntires(String name, int quantity) throws Exception;
}
