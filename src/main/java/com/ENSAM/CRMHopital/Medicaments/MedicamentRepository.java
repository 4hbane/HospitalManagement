package com.ENSAM.CRMHopital.Medicaments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Collection;
import java.util.Date;

@RepositoryRestResource(exported = false)
public interface MedicamentRepository extends JpaRepository<Medicament, Long> {

    public Collection<Medicament> getMedicamentByType(MedicamentType type);
    public Collection<Medicament> getMedicamentByExpiredDateBefore(Date date);
    public long countMedicamentByNom( String nom);
    public long countMedicamentByType( MedicamentType type);

}
