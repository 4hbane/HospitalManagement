package com.mna.crmhospital.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Drug {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private DrugType type;
    @NotNull
    private Double price;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "drug_id", cascade=CascadeType.ALL)
    private List<DrugVisit> visits = new ArrayList<>(0);

    @JsonIgnore
    @OneToMany(mappedBy="drug")
    private List<Inventory> inventories;

    @Override
    public String toString() {
        return "Drug{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type=" + type +
                ", price=" + price +
                ", visits=" + visits +
                '}';
    }
}
