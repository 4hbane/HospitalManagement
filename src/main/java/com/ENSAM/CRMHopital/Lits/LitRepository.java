package com.ENSAM.CRMHopital.Lits;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Collection;

@RepositoryRestResource(exported = false)
public interface LitRepository  extends JpaRepository<Lit, Long> {

    public Collection<Lit> getLitByRoomNumber(String roomNumber);
    public Collection<Lit> getLitByFloorNumber(Long floorNumber);
    public Collection<Lit> getLitByService(String service);
    public Collection<Lit> getLitByIsOccupied(Boolean isOccupied);
    public long countLitByRoomNumber( String roomNumber);
    public long countLitByFloorNumber( Long floorNumber);
    public long countLitByService( String service);
    public long countLitByIsOccupied( Boolean isOccupied);

}
