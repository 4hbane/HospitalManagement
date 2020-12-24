package com.mna.crmhospital.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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
    private Long adminFolderNumber;

    @OneToOne(mappedBy = "medicalFolder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Hospitalization hospitalization;
}
