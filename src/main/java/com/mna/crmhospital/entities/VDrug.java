package com.mna.crmhospital.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString @Data @NoArgsConstructor
public class VDrug {
    private Long drug_id;
    private int quantity;
}
