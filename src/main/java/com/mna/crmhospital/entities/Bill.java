package com.mna.crmhospital.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Bill {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private Long bill_no = count++;
    private boolean paid;
    @Temporal( TemporalType.TIMESTAMP )
    @CreationTimestamp
    private Date creationDate;

    @Temporal (TemporalType.DATE)
    private Date lastDateToPay;

    private Double amount;
    private Double tax = 5.00;

    @OneToOne
    @JoinColumn(name = "visit_id", referencedColumnName = "id")
    @JsonManagedReference
    private Visit visit;

    public static long count = 0;

    @Override
    public String toString() {
        return "Bill{" +
                "id=" + id +
                ", bill_no=" + bill_no +
                ", creationDate=" + creationDate +
                ", lastDateToPay=" + lastDateToPay +
                ", amount=" + amount +
                ", tax=" + tax +
                '}';
    }
}
