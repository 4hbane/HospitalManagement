package com.mna.crmhospital.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrugInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="drugs_inventory",
            joinColumns=@JoinColumn(name="inventory_id", referencedColumnName="id"),
            inverseJoinColumns=@JoinColumn(name="drug_id", referencedColumnName="id"))
    private List<Drug> drugs;

    @Temporal( TemporalType.DATE )
    private Date expirationDate;

    //TODO(): Maybe add quantity ?
}
