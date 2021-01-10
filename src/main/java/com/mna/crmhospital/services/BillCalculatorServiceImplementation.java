package com.mna.crmhospital.services;

import com.mna.crmhospital.entities.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;

import static java.time.temporal.ChronoUnit.DAYS;

@AllArgsConstructor
@Service
public class BillCalculatorServiceImplementation implements BillCalculatorService {

    @Override
    public Bill calculateBill(Visit v) {
        if(v instanceof Consultation) {
            return calculateConsultationBill(v);
        } else {
            return calculateHospitalizationBill(v);
        }
    }

    //NOTE(): This code is duplicated, Bill b can be an attribute of BC. IK IK.
    public Bill calculateConsultationBill(Visit v) {
        Bill b = new Bill();
        b.setId(null);
        b.setVisit(v);
        Date today = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(today);
        cal.add(Calendar.DAY_OF_MONTH, 7);

        b.setLastDateToPay(cal.getTime());
        double amount = 0.0;
        for(Drug drug : v.getDrugs()) amount += drug.getPrice();
        b.setAmount(amount);
        return b;
    }

    public Bill calculateHospitalizationBill(Visit v) {
        Bill b = new Bill();
        Hospitalization h = (Hospitalization) v;
        b.setId(null);
        b.setVisit(h);
        Date today = new Date();
        h.setExitDate(today);
        Calendar cal = Calendar.getInstance();
        cal.setTime(today);
        cal.add(Calendar.DAY_OF_MONTH, 7);
        b.setLastDateToPay(cal.getTime());

        //TODO(): Remove line below in prod.
        h.setVisitDate(new Date("1/1/2021"));

        double amount = 0.0;
        int hospitalizationPeriod = (int)( (h.getExitDate().getTime() - h.getVisitDate().getTime())
                / (1000 * 60 * 60 * 24) );
        System.out.println(hospitalizationPeriod);
        for(Drug drug : h.getDrugs()) amount += drug.getPrice();
        amount += h.getBed().getPricePerDay() * hospitalizationPeriod;
        b.setAmount(amount);
        return b;
    }
}
