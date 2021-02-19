package com.mna.crmhospital.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class MedicalFolder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long folderNumber;
    private String medicalConditions; // Comma separated values
    private String consultation;
    private String diet;
    private boolean isHospitalized;

    @NotNull
    @Column(unique=true)
    private Long patientNumber;

}
