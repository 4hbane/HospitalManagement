package com.ENSAM.CRMHopital.Lits;


import com.sun.deploy.net.HttpResponse;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class LitRestController {

    private LitRepository litRepository;

/**
* GET
*/
    @RequestMapping(value = "/lits", method = RequestMethod.GET)
    public Collection<Lit> getAllLits(){
        return litRepository.findAll ();
    }

    @RequestMapping(value = "/lits/{id}", method = RequestMethod.GET)
    public Optional<Lit> getLitById(@PathVariable(name = "id") Long id) throws NotFoundException {
        if (!litRepository.existsById ( id )){
            throw new LitNotFoundException ("The Lit with the given Id does not exist! ");

        }
        return litRepository.findById ( id );
    }

    @RequestMapping(value = "/litsByRoomNumber/{roomNumber}", method = RequestMethod.GET)
    public Collection<Lit> getLitsByRoomNumber(@PathVariable(name = "roomNumber") String roomNumber){
        return litRepository.getLitByRoomNumber ( roomNumber );
    }

    @RequestMapping(value = "/litsByFloorNumber/{floorNumber}", method = RequestMethod.GET)
    public Collection<Lit> getLitsByFloorNumber(@PathVariable(name = "floorNumber") Long floorNumber){
        return litRepository.getLitByFloorNumber ( floorNumber );
    }

    @RequestMapping(value = "/litsByService/{service}", method = RequestMethod.GET)
    public Collection<Lit> getLitsByService(@PathVariable(name = "service") String service){
        return litRepository.getLitByService ( service );
    }

    @RequestMapping(value = "/litsByOccupation/{isOccupied}", method = RequestMethod.GET)
    public Collection<Lit> getLitsByOccupation(@PathVariable(name = "isOccupied") Boolean isOccupied){
        return litRepository.getLitByIsOccupied ( isOccupied );
    }

    @RequestMapping(value = "/litsCountByRoomNumber/{roomNumber}", method = RequestMethod.GET)
    public long countLitsByRoomNumber(@PathVariable(name = "roomNumber") String roomNumber){
        return litRepository.countLitByRoomNumber ( roomNumber );
    }

    @RequestMapping(value = "/litsCountByFloorNumber/{floorNumber}", method = RequestMethod.GET)
    public long countLitsByFloorNumber(@PathVariable(name = "floorNumber") Long floorNumber){
        return litRepository.countLitByFloorNumber ( floorNumber );
    }

    @RequestMapping(value = "/litsCountByService/{service}", method = RequestMethod.GET)
    public long countLitsByService(@PathVariable(name = "service") String service){
        return litRepository.countLitByService ( service );
    }

    @RequestMapping(value = "/litsCountByOccupation/{isOccupied}", method = RequestMethod.GET)
    public long countLitsByOccupation(@PathVariable(name = "isOccupied") Boolean isOccupied){
        return litRepository.countLitByIsOccupied ( isOccupied );
    }


/**
* POST
*/
    @RequestMapping(value = "/lits", method = RequestMethod.POST)
    public Lit createLit(@RequestBody Lit newLit){
        newLit.setId ( null );
        return litRepository.save ( newLit );
    }


/**
* PUT
*/
    @RequestMapping(value = "/lits/{id}", method = RequestMethod.PUT)
    public Lit editLit(@PathVariable( name = "id") Long id, @RequestBody Lit editedLit) throws NotFoundException {
        if (!litRepository.existsById ( id )){
            throw new LitNotFoundException ("The Lit with the given Id does not exist! ");
        }
        editedLit.setId ( id );
        return litRepository.save ( editedLit );
    }

/**
* DELETE
*/
    @RequestMapping(value = "/lits/{id}", method = RequestMethod.DELETE)
    public void deleteLitById(@PathVariable( name = "id") Long id) throws NotFoundException {
        if (!litRepository.existsById ( id )){
            throw new LitNotFoundException ("The Lit with the given Id does not exist! ");
        }
        litRepository.deleteById ( id );
    }

}
