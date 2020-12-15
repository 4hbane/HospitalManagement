package com.ENSAM.CRMHopital.Medicaments;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class Medicament {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String nom;
    @NotNull
    private MedicamentType type;  // https://fr.wikipedia.org/wiki/M%C3%A9dicament
    @NotNull
    @Temporal( TemporalType.DATE )
    private Date expiredDate;
}
