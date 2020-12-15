package com.ENSAM.CRMHopital.Personnels;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class  Personnel {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String firstName;
    @NonNull
    private String lastName;
    @NotNull
    @Column(unique=true)
    private String cin;
    @NotNull
    @Column(unique = true)
    private String email;
    @NotNull
    private String phoneNumber;
    @NotNull
    private String address;
    @NotNull
    @Temporal ( TemporalType.DATE )
    private Date birthDay;
    @NotNull
    private Gender gender;
    @NotNull
    private PersonnelStatus status;
    @NotNull
    private String service;
    @NotNull
    private PersonnelFunction function;
    @NotNull
    @Temporal ( TemporalType.DATE )
    private Date creationDate;

}
