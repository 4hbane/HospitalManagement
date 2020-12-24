package com.mna.crmhospital.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Random;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class Bed {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private Long roomNumber;
    @NotNull
    private Long floorNumber;
    @NotNull
    private String service;
    @NotNull
    private Double pricePerDay;
    @NotNull
    private Boolean isOccupied;

    public static long count = 0;

    public static Bed getInstance() {
        Random random = new Random();
        return new Bed(null, count++, 1L, "Hospital Bed",200d, false);
    }
}
