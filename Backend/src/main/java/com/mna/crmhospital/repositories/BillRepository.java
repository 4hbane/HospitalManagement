package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.Bill;
import com.mna.crmhospital.entities.Drug;
import com.mna.crmhospital.entities.DrugType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findBillsByLastDateToPay (Date lastDateToPay);
}
