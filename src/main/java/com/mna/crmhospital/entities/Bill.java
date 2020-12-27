package com.mna.crmhospital.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Bill {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private Long bill_no = count++;
    @Temporal (TemporalType.DATE)
    private Date creationDate;
    @Temporal (TemporalType.DATE)
    private Date lastDateToPay;
    private Double amount;
    private Double tax = 5.00;

    @OneToOne
    @JoinColumn(name = "medicalFolder_id", referencedColumnName = "folderNumber")
    @JsonManagedReference
    private MedicalFolder medicalFolder;

    public static long count = 0;

}
