package com.mna.crmhospital.services;

import com.mna.crmhospital.entities.Bill;
import com.mna.crmhospital.entities.Visit;

public interface BillCalculatorService {
    Bill calculateBill(Visit v);
}
