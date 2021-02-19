package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.*;
import com.mna.crmhospital.repositories.BillRepository;
import com.mna.crmhospital.repositories.HospitalizationRepository;
import com.mna.crmhospital.repositories.VisitRepository;
import com.mna.crmhospital.services.BillCalculatorService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
@AllArgsConstructor
public class BillController {

    private final BillRepository billRepository;
    private final BillCalculatorService billCalculatorService;
    private final VisitRepository visitRepository;
    private final HospitalizationRepository hospitalizationRepository;
    @GetMapping("/factures")
    public List<Bill> getBills() { return billRepository.findAll(); }

    @GetMapping("/factures/{id}")
    public Bill getBill(@PathVariable Long id) {
        Optional<Bill> bill= billRepository.findById(id);
        return bill.orElse(null);
    }

    @GetMapping("/factures/date/{lastDateToPay}")
    public List<Bill> getBillsByLastDateToPay(@PathVariable String lastDateToPay) {
        Date date= null;
        try {
            date = new SimpleDateFormat("yyyy-MM-dd").parse(lastDateToPay);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return billRepository.findBillsByLastDateToPay(date);
    }

    // Calcul de facture d'une visite
    @GetMapping("/ajoutfactures/{visitId}")
    public Bill saveBill(@PathVariable Long visitId) {
        Optional<Visit> visitOptional = visitRepository.findById(visitId);
        if(visitOptional.isPresent()) {
            Bill b = billCalculatorService.calculateBill(visitOptional.get());
            return billRepository.save(b);
        }
        else return null;
    }

    @GetMapping("/factures/payer/{id}")
    public Bill payBill(@PathVariable Long id) {
        Optional<Bill> billOptional = billRepository.findById(id);
        if(billOptional.isPresent()) {
            // Make bill paid
            Bill bill = billOptional.get();
            bill.setPaid(true);
            billRepository.save(bill);
            // Free bed
            Visit v = bill.getVisit();
            if(v.getClass().equals(Hospitalization.class)) {
                Hospitalization h = (Hospitalization) v;
                h.getBed().setIsOccupied(false);
                hospitalizationRepository.save(h);
            }
            return bill;
        }
        return null;
    }
}
