package com.mna.crmhospital.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode(callSuper = true)
public class Hospitalization extends Visit {
    private Date exitDate;
    private String doctorName;
    private String serviceHospitalization;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private MedicalFolder medicalFolder;

    @OneToOne
    @JoinColumn(name = "bed_id", referencedColumnName = "id")
    @JsonManagedReference
    private Bed bed;

    public Hospitalization(Long id, Long patientNumber, String reason, Date exitDate, Bed bed, String doctorName, String serviceHospitalization) {
        super(id, patientNumber, reason, doctorName);
        this.exitDate = exitDate;
        this.serviceHospitalization = serviceHospitalization;
        this.bed = bed;
    }

}
