package com.ENSAM.CRMHopital.Medicaments;

import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Collection;
import java.util.Optional;


@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class MedicamentRestController {

    private MedicamentRepository medicamentRepository;

/**
* GET
*/
    @RequestMapping(value = "/medicaments", method = RequestMethod.GET)
    public Collection<Medicament> getAllMedicaments(){
        return medicamentRepository.findAll ();
    }

    @RequestMapping(value = "/medicaments/{id}", method = RequestMethod.GET)
    public Optional<Medicament> getMedicamentById(@PathVariable(name = "id") Long id) throws NotFoundException {
        if (!medicamentRepository.existsById ( id )){
            throw new MedicamentNotFoundException ("The Medicament with the given Id does not exist! ");
        }
        return medicamentRepository.findById ( id );
    }

    @RequestMapping(value = "/medicamentByType/{type}", method = RequestMethod.GET)
    public Collection<Medicament> getMedicamentByNom(@PathVariable(name = "type") MedicamentType type){
        return medicamentRepository.getMedicamentByType ( type );
    }


    @RequestMapping(value = "/medicamentsExpired", method = RequestMethod.GET)
    public Collection<Medicament> getExpiredMedicaments(){
        return medicamentRepository.getMedicamentByExpiredDateBefore ( Calendar.getInstance ().getTime () );
    }

    @RequestMapping(value = "/medicamentsCountByNom/{nom}", method = RequestMethod.GET)
    public long countMedicamentsByNom(@PathVariable(name = "nom") String nom){
        return medicamentRepository.countMedicamentByNom (nom );
    }

    @RequestMapping(value = "/medicamentsCountByType/{type}", method = RequestMethod.GET)
    public long countMedicamentsByType(@PathVariable(name = "type") MedicamentType type){
        return medicamentRepository.countMedicamentByType (type );
    }


/**
* POST
*/
    @RequestMapping(value = "/medicaments", method = RequestMethod.POST)
    public Medicament createMedicament(@RequestBody Medicament newMedicament){
        newMedicament.setId ( null );
        return medicamentRepository.save ( newMedicament );
    }

/**
* PUT
*/
    @RequestMapping(value = "/medicaments/{id}", method = RequestMethod.PUT)
    public Medicament editMedicament(@PathVariable( name = "id") Long id, @RequestBody Medicament editedMedicament) throws NotFoundException {
        if (!medicamentRepository.existsById ( id )){
            throw new MedicamentNotFoundException ("The Medicament with the given Id does not exist! ");
        }
        editedMedicament.setId ( id );
        return medicamentRepository.save ( editedMedicament );
    }

/**
* DELETE
*/
    @RequestMapping(value = "/medicaments/{id}", method = RequestMethod.DELETE)
    public void deleteMedicamentById(@PathVariable( name = "id") Long id) throws NotFoundException {
        if (!medicamentRepository.existsById ( id )){
            throw new MedicamentNotFoundException ("The Medicament with the given Id does not exist! ");
        }
        medicamentRepository.deleteById ( id );
    }

}
