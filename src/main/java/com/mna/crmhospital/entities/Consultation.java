package com.mna.crmhospital.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity @Data @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode(callSuper = true)
public class Consultation extends Visit {
    private String diagnostic;

    public Consultation(Long id, Long patientNumber, String reason, String doctorName) {
        super(id, patientNumber, reason, doctorName);
    }
}
