package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Drug;
import com.mna.crmhospital.entities.Inventory;
import com.mna.crmhospital.repositories.DrugRepository;
import com.mna.crmhospital.repositories.InventoryRepository;
import com.mna.crmhospital.services.InventoryService;
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

    private final InventoryService inventoryService;

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

    // TODO(): Someone TEST this and remove comment. Add test to collection.
    @PostMapping("/inventaire/{name}/{expiryDate}/{quantity}")
    public List<Inventory> saveInventoryEntry(@PathVariable String name, @PathVariable String expiryDate, @PathVariable int quantity) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        Drug drug = drugRepository.findDrugByName(name);
        List<Inventory> inventories = new ArrayList<>();
        for(int i = 0; i < quantity; i++) {
            Inventory inventory = new Inventory(null, drug, sdf.parse(expiryDate));
            inventories.add(inventory);
            inventoryRepository.save(inventory);
            drug.getInventories().add(inventory);
        }
        drugRepository.save(drug);
        return inventories;
    }

    @DeleteMapping("/inventaire/{name}")
    public Inventory deleteInventoryEntry(@PathVariable String name) throws Exception {
        return inventoryService.deleteInventoryEntires(name, 1).get(0);
    }

    @DeleteMapping("/inventaire/{name}/{quantity}")
    public List<Inventory> deleteInventoryEntry(@PathVariable String name, @PathVariable int quantity) throws Exception {
        return inventoryService.deleteInventoryEntires(name, quantity);
    }
}
