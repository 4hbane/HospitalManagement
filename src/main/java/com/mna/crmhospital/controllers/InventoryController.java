package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Drug;
import com.mna.crmhospital.entities.Inventory;
import com.mna.crmhospital.repositories.DrugRepository;
import com.mna.crmhospital.repositories.InventoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


// TODO(): Might been useless. A service might be better.
@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/medicaments")
@AllArgsConstructor
public class InventoryController {
    private final InventoryRepository inventoryRepository;
    private final DrugRepository drugRepository;

    private Inventory deleteOneInventoryEntry(String name) {
        Inventory inventory = null ;
        List<Inventory> inventories = inventoryRepository.findAllByDrugName(name);
        inventories.sort(Comparator.comparing(Inventory::getExpirationDate));
        inventory = inventories.get(0);
        inventoryRepository.delete(inventories.get(0));
        return inventory;
    }

    private List<Inventory> deleteMutipleInventoryEntires(String name, int quantity) {
        List<Inventory> returnInventories = new ArrayList<>() ;
        List<Inventory> inventories = inventoryRepository.findAllByDrugName(name);
        inventories.sort(Comparator.comparing(Inventory::getExpirationDate));
        returnInventories = inventories.subList(0, quantity);
        inventoryRepository.deleteInBatch(returnInventories);
        return returnInventories;
    }

    @GetMapping("/inventaire")
    public List<Inventory> getInventory() {
        List<Inventory> inventories = inventoryRepository.findAll();
        return inventories;
    }

    @PostMapping("/inventaire")
    public Inventory saveInventoryEntry(@RequestBody Drug drug, Date expiryDate) {
        Inventory i = new Inventory(null, drug, expiryDate);
        return inventoryRepository.save(i);
    }

    // TODO(): This is not clean. This is BAD.
    // TODO(): Returning Inventories causes infinite loop.
    @PostMapping("/inventaire/{name}/{expiryDate}")
    public Inventory saveInventoryEntry(@PathVariable String name, @PathVariable String expiryDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        Drug drug = drugRepository.findDrugByName(name);
        Inventory i = new Inventory(null, drug, sdf.parse(expiryDate));
        inventoryRepository.save(i);
        drug.getInventories().add(i);
        drugRepository.save(drug);
        return i;
    }

    @DeleteMapping("/inventaire/{name}")
    public Inventory deleteInventoryEntry(@PathVariable String name) {
        return deleteOneInventoryEntry(name);
    }

    @DeleteMapping("/inventaire/{name}/{quantity}")
    public List<Inventory> deleteInventoryEntry(@PathVariable String name, @PathVariable int quantity) {
        return deleteMutipleInventoryEntires(name, quantity);
    }
}
