package com.mna.crmhospital.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    @Column( unique = true)
    private String CIN;
    @NotNull
    @Column( unique = true)
    private String email;
    @NotNull
    private String phoneNumber;
    @NotNull
    private String address;
    @NotNull
    @Temporal (TemporalType.DATE)
    private Date birthDate;
    @NotNull
    private Gender gender;
    @NotNull
    private StaffStatus status;
    @NotNull
    private String service;
    @NotNull
    private StaffFunction sfunction;
    @NotNull
    @Temporal (TemporalType.DATE)
    private Date creationDate;
}
