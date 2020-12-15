package com.ENSAM.CRMHopital.Personnels;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Collection;

@RepositoryRestResource(exported = false)
public interface PersonnelRepository extends JpaRepository<Personnel, Long> {

    public Collection<Personnel> getPersonnelByCinContains(@Param ( "cin" ) String cin);
    public Collection<Personnel> getPersonnelByService(String service);
    public Collection<Personnel> getPersonnelByFunction(PersonnelFunction function);
    public Collection<Personnel> getPersonnelByStatus( PersonnelStatus status);
    public Personnel getPersonnelByEmail( String email);
    public long countPersonnelByFunction( PersonnelFunction function);
}
