package com.ENSAM.CRMHopital.Personnels;

import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class PersonnelRestController {

    private PersonnelRepository personnelRepository;

/**
 * GET
 */
    @RequestMapping(value = "/personnels", method = RequestMethod.GET)
    public Collection<Personnel> getAllPersonnel(){
        return personnelRepository.findAll ();
    }

    @RequestMapping(value = "/personnels/{id}", method = RequestMethod.GET)
    public Optional<Personnel> getPersonnelById(@PathVariable(name = "id") Long id) throws NotFoundException {
        if (!personnelRepository.existsById ( id )){
            throw new PersonnelNotFoundException ("The Personnel with the given Id does not exist! ");
        }
        return personnelRepository.findById ( id );
    }

    @RequestMapping(value = "/personnelByEmail/{email}", method = RequestMethod.GET)
    public Personnel getPersonnelByEmail(@PathVariable(name = "email") String email){
        return personnelRepository.getPersonnelByEmail ( email );
    }

    @RequestMapping(value = "/personnelsByCin/{cin}", method = RequestMethod.GET)
    public Collection<Personnel> getPersonnelsContainingCin(@PathVariable(name = "cin") String cin){
        return personnelRepository.getPersonnelByCinContains ( cin );
    }

    @RequestMapping(value = "/personnelsByService/{service}", method = RequestMethod.GET)
    public Collection<Personnel> getPersonnelsByService(@PathVariable(name = "service") String service){
        return personnelRepository.getPersonnelByService ( service );
    }

    @RequestMapping(value = "/personnelsByFunction/{function}", method = RequestMethod.GET)
    public Collection<Personnel> getPersonnelsByFunction(@PathVariable(name = "function") PersonnelFunction function){
        return personnelRepository.getPersonnelByFunction ( function );
    }

    @RequestMapping(value = "/personnelsByStatus/{status}", method = RequestMethod.GET)
    public Collection<Personnel> getPersonnelsByStatus(@PathVariable(name = "status") PersonnelStatus status){
        return personnelRepository.getPersonnelByStatus ( status );
    }

    @RequestMapping(value = "/personnelsCountByFunction/{function}", method = RequestMethod.GET)
    public long countByFunction(@PathVariable(name = "function") PersonnelFunction function){
        return personnelRepository.countPersonnelByFunction ( function );
    }


  /**
  * POST
  */
    @RequestMapping(value = "/personnels", method = RequestMethod.POST)
    public Personnel createPersonnel(@RequestBody Personnel newPersonnel){
        newPersonnel.setId ( null );
        return personnelRepository.save ( newPersonnel );
    }

 /**
 * PUT
 */
     @RequestMapping(value = "/personnels/{id}", method = RequestMethod.PUT)
     public Personnel editPersonnel(@PathVariable( name = "id") Long id,@RequestBody Personnel editedPersonnel) throws NotFoundException {
         if (!personnelRepository.existsById ( id )){
             throw new PersonnelNotFoundException ("The Personnel with the given Id does not exist! ");
         }
         editedPersonnel.setId ( id );
         return personnelRepository.save ( editedPersonnel );
     }

 /**
 * DELETE
 */
    @RequestMapping(value = "/personnels/{id}", method = RequestMethod.DELETE)
    public void deletePersonnelById(@PathVariable( name = "id") Long id) throws NotFoundException {
        if (!personnelRepository.existsById ( id )){
            throw new PersonnelNotFoundException ("The Personnel with the given Id does not exist! ");
        }
        personnelRepository.deleteById ( id );
    }

}
