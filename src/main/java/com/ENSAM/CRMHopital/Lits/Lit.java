package com.ENSAM.CRMHopital.Lits;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data @NoArgsConstructor @ToString
public class Lit {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String roomNumber;
    @NotNull
    private Long floorNumber;
    @NotNull
    private String service;
    @NotNull
    private Boolean isOccupied;


    public Lit( String roomNumber, Long floorNumber, String service) {
        this.roomNumber = roomNumber;
        this.floorNumber = floorNumber;
        this.service = service;
        this.isOccupied = false;
    }
}
