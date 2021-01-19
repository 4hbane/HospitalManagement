package com.mna.crmhospital.services;

import com.mna.crmhospital.entities.Inventory;
import com.mna.crmhospital.repositories.DrugRepository;
import com.mna.crmhospital.repositories.InventoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@AllArgsConstructor
@Service
public class InventoryServiceImplementation implements InventoryService {
    private final InventoryRepository inventoryRepository;
    private final DrugRepository drugRepository;

    @Override
    public List<Inventory> deleteInventoryEntires(String name, int quantity) throws Exception {
        List<Inventory> returnInventories = new ArrayList<>() ;
        List<Inventory> inventories = inventoryRepository.findAllByDrugName(name);
        if(inventories.size() == 0 ) throw new Exception();
        inventories.sort(Comparator.comparing(Inventory::getExpirationDate));
        returnInventories = inventories.subList(0, quantity);
        inventoryRepository.deleteInBatch(returnInventories);
        return returnInventories;
    }

}
