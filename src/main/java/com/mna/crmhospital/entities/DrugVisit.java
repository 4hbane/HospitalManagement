package com.mna.crmhospital.entities;

import com.mna.crmhospital.repositories.VisitRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @AllArgsConstructor @NoArgsConstructor
@Data
@AssociationOverrides({
        @AssociationOverride(name = "drug_id",
                joinColumns = @JoinColumn(name = "drug_id")),
        @AssociationOverride(name = "visit_id",
                joinColumns = @JoinColumn(name = "visit_id")) })
public class DrugVisit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long drug_id;
    private Long visit_id;
    private int quantity;
}
