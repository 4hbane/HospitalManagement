package com.mna.crmhospital.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="drugs_visit",
            joinColumns=@JoinColumn(name="visit_id", referencedColumnName="id"),
            inverseJoinColumns=@JoinColumn(name="drug_id", referencedColumnName="id"))
    private List<Drug> drugs;


    @OneToOne(mappedBy = "visit",fetch = FetchType.LAZY)
    @JsonBackReference
    private Bill bill;

    public Visit(Long id, Long patientNumber, String reason, String doctorName) {
        this.id = id;
        this.patientNumber = patientNumber;
        this.reason = reason;
        this.doctorName = doctorName;
    }
}
