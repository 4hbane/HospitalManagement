package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Bed;
import com.mna.crmhospital.repositories.BedRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
@AllArgsConstructor
public class BedController {

    private final BedRepository bedRepository;

    @GetMapping("/lits")
    public List<Bed> getBeds() { return bedRepository.findAll(); }

    @GetMapping("/lits/{id}")
    public Bed getBed(@PathVariable Long id) {
        Optional<Bed> bed = bedRepository.findById(id);
        return bed.orElse(null);
    }

    @GetMapping("/lits/occupe/{isOccupied}")
    public List<Bed> getBedsByOccupiedOrNot(@PathVariable boolean isOccupied) {
        return bedRepository.findAllByIsOccupied(isOccupied);
    }

    @GetMapping("/lists/occupe/nombre")
    public Long getCountOfOccupiedBeds() {
        return bedRepository.countAllByIsOccupied(true);
    }


    @PostMapping("/lits")
    public Bed saveBed(@RequestBody Bed bed) {
        bed.setId(null);
        return bedRepository.save(bed);
    }

    @PutMapping("/lits/{id}")
    public Bed updateBed(@RequestBody Bed bed, @PathVariable Long id) {
        if(bedRepository.existsById(id) && bed.getId().equals(id)) {
            bedRepository.save(bed);
        }
        return null;
    }

    @PutMapping("/lits/prix")
    public Boolean updateBedPrice(@RequestBody Bed bed) {
        if( bed.getPricePerDay () != 0 & bed.getPricePerDay () != null ){
            bedRepository.updatePrice ( bed.getPricePerDay () );
            return true;
        }
        return false;
    }

    @DeleteMapping("/lits/{id}")
    public void deleteBed(@PathVariable Long id) {
        if(bedRepository.existsById(id))
            bedRepository.deleteById(id);
    }
}
