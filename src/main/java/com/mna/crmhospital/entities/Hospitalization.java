package com.mna.crmhospital.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class Hospitalization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String existingConditions;
    private Date entryDate;
    private Date exitDate;
    private String admissionReason;
    private Long bedNumber;
    private String doctorName;
    private String serviceHospitalization;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private MedicalFolder medicalFolder;

    public Hospitalization(Long id, String condition, Date entryDate, Date exitDate, String admissionReason, Long bedNumber, String doctorName, String serviceHospitalization) { }
}
