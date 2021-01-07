package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.*;
import com.mna.crmhospital.repositories.BillRepository;
import com.mna.crmhospital.repositories.HospitalizationRepository;
import com.mna.crmhospital.repositories.MedicalFolderRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.time.temporal.ChronoUnit.DAYS;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
@AllArgsConstructor
public class BillController {

    private final BillRepository billRepository;
    private final MedicalFolderRepository medicalFolderRepository;

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

    //Calcul de facture d'un dossier medical
    @GetMapping("/ajoutfactures/{numFolder}")
    public Bill saveBill(@PathVariable Long numFolder) {
        Bill bill = new Bill();
        Optional<MedicalFolder> medicalFolderOptional = medicalFolderRepository.findById(numFolder);
        if(medicalFolderOptional.isPresent()) {
            MedicalFolder medicalFolder = medicalFolderOptional.get();
            bill.setMedicalFolder(medicalFolder);
            bill.setId(null);

            Date today = new Date();
            Calendar cal = Calendar.getInstance();
            cal.setTime(today);
            cal.add(Calendar.DAY_OF_MONTH, 7);
            bill.setCreationDate(today);
            bill.setLastDateToPay(cal.getTime());

            double amountMedoc = 0.0;
            for (Drug drug : medicalFolder.getDrugs())
                amountMedoc = amountMedoc + drug.getPrice();

            if(medicalFolder.getHospitalization() != null){
                LocalDate entryInstant = medicalFolder.getHospitalization().getEntryDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                LocalDate exitInstant = medicalFolder.getHospitalization().getExitDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                long hospitalizationPeriod = DAYS.between(entryInstant, exitInstant);
                double amountBed = medicalFolder.getHospitalization().getBed().getPricePerDay() * hospitalizationPeriod;
                bill.setAmount(amountBed + amountMedoc);
            } else{
                bill.setAmount(amountMedoc);
            }
            return billRepository.save(bill);
        }
        else return null;
    }


}
