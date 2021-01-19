package com.mna.crmhospital.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long patientNumber;

    private String reason; // Visit reason || Admission Reason

    @Temporal( TemporalType.TIMESTAMP )
    @CreationTimestamp
    private Date visitDate;

    private String doctorName;

    @OneToOne(mappedBy = "visit",fetch = FetchType.LAZY)
    @JsonBackReference
    private Bill bill;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "visit_id", cascade=CascadeType.ALL)
    private List<DrugVisit> drugVisitSet = new ArrayList<>(0);


    public Visit(Long id, Long patientNumber, String reason, String doctorName) {
        this.id = id;
        this.patientNumber = patientNumber;
        this.reason = reason;
        this.doctorName = doctorName;
    }
}
