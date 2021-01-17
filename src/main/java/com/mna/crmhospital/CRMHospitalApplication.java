package com.mna.crmhospital;

import com.mna.crmhospital.entities.*;
import com.mna.crmhospital.repositories.*;

import com.mna.crmhospital.services.SUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class CRMHospitalApplication {

    public static void main(String[] args) {
        SpringApplication.run(CRMHospitalApplication.class, args);
    }

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    CommandLineRunner start(PatientRepository patientRepository, MedicalFolderRepository medicalFolderRepository, HospitalizationRepository hospitalizationRepository, ConsultationRepository consultationRepository,
                            StaffRepository staffRepository, BedRepository bedRepository, DrugRepository drugRepository, DrungInventoryRepository drungInventoryRepository,
                            SRoleRepository sRoleRepository, SUserService sUserServiceImplementation) {
        return args -> {

            // Patients
            patientRepository.save(new Patient(1L,"Manal","Outaleb","Femme", new Date(),"Avenue Mohammed V, Ouarzazate", 45000L,"Celibataire","Ingenieur","0673290031","PL25617","CNOPS", 1L));
            patientRepository.save(new Patient(2L,"Majdouline","Outaleb","Femme", new Date(),"Avenue Mohammed V, Ouarzazate", 45000L,"Celibataire","Ingenieur","0770359120","JK27106","CNOPS", 2L));
            patientRepository.save(new Patient(3L,"Abdou","Ahbane","Homme", new Date(),"Avenue Hassan II, Aoulouz", 83052L,"Marie","Ingenieur","0654330112","LM93510","CNOPS",3L));
            patientRepository.save(new Patient(4L,"Mounib","Elboujbaoui","Homme", new Date(),"Rue Caire, Sidi Ifni", 85200L,"Celibataire","Ingenieur","0623877719","JD50000","CNOPS",4L));



            // MedicalFolders
            medicalFolderRepository.save(new MedicalFolder(1L,"Diabete","Etat d'hypoglycemie","", false, 1L));
            medicalFolderRepository.save(new MedicalFolder(2L,"Epilepsie","Crises d'epilepsie regulieres","", true, 2L));
            medicalFolderRepository.save(new MedicalFolder(3L,"Maladie de Parkinson","Lenteur à se mouvoir, à decoder et à traiter l'information","", false, 3L));
            medicalFolderRepository.save(new MedicalFolder(4L,"Glaucome","Retrecissement progressif du champ visuel","", false, 4L));

            // Beds.
            Bed b = bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());

            // Hospitalization of Patient 2L, of Medical Folder 2L
            Hospitalization h = hospitalizationRepository.save(new Hospitalization(null, 2L, "Crises depilepsie regulieres", null, b,"Dr. Majdouline Outaleb","Service de Neurologie."));

            // Consultations
            // Patient 1
            Consultation c1 = consultationRepository.save(new Consultation(null, 1L, "Perte de conscience", "Dr. Outaleb Manal"));
            Consultation c2 = consultationRepository.save(new Consultation(null, 1L, "Confusion, desorientation et irritabilite", "Dr. Outaleb Manal"));
            Consultation c3 = consultationRepository.save(new Consultation(null, 1L, "Etourdissements, fatigue, irritabilité", "Dr. Outaleb Manal"));

            // Patient 3
            Consultation c4 = consultationRepository.save(new Consultation(null, 3L, "Maladie de Parkinson", "Dr. Outaleb Manal"));

            // Patient 4
            Consultation c5 = consultationRepository.save(new Consultation(null, 4L, "Trouble de vision", "Dr. Ahbane Abdellah"));


            // Staff
            staffRepository.save(new Staff(null, "admin", "admin", "admin001", "admin@app.com", "0607080901", "Aoulouz", new Date(), Gender.MALE, StaffStatus.ACTIVE, "Administration", StaffFunction.ADMIN, new Date()));
            staffRepository.save(new Staff(null, "director", "director", "director001", "director@app.com", "0605070101", "Sidi Ifni", new Date(), Gender.MALE, StaffStatus.ACTIVE, "Administration", StaffFunction.DIRECTOR, new Date()));
            staffRepository.save(new Staff(null, "doctor", "doctor", "doctor001", "doctor@app.com", "06070445522", "Ouerzazate", new Date(), Gender.FEMALE, StaffStatus.ACTIVE, "Reanimation", StaffFunction.DOCTOR, new Date()));
            staffRepository.save(new Staff(null, "pharmacist", "pharmacist", "pharmacist001", "pharmacist@app.com", "0307080901", "Marrakesh", new Date(), Gender.FEMALE, StaffStatus.ACTIVE, "Pharmacie", StaffFunction.PHARMACIST, new Date()));
            staffRepository.save(new Staff(null, "receptionist", "receptionist", "receptionist001", "receptionist@app.com", "0333080901", "Mohammedia", new Date(), Gender.MALE, StaffStatus.ACTIVE, "Administration", StaffFunction.RECEPTIONIST, new Date()));
            staffRepository.save(new Staff(null, "rh", "rh", "rh001", "rh@app.com", "0333080901", "Mohammedia", new Date(), Gender.MALE, StaffStatus.ACTIVE, "Ressources Humaines", StaffFunction.RH, new Date()));


            // Drugs
            Drug Dolipran = drugRepository.save(new Drug(null, "Dolipran", DrugType.GENERIQUE,23.58));
            Drug Supradyn = drugRepository.save(new Drug(null, "Supradyn", DrugType.GENERIQUE,5.26));
            Drug Aspegic = drugRepository.save(new Drug(null, "Aspegic", DrugType.GENERIQUE,48.00));

            List<Drug> drugsList = new ArrayList<>();
            drugsList.add(Dolipran);
            drugsList.add(Supradyn);

            DrugInventory di = drungInventoryRepository.save(new DrugInventory(null, drugsList, null));
            System.out.println(di.getDrugs());


            // Users and Roles
            sRoleRepository.save(new SRole(null, StaffFunction.ADMIN.toString ()));
            sRoleRepository.save(new SRole(null, StaffFunction.DIRECTOR.toString ()));
            sRoleRepository.save(new SRole(null, StaffFunction.DOCTOR.toString ()));
            sRoleRepository.save(new SRole(null, StaffFunction.PHARMACIST.toString ()));
            sRoleRepository.save(new SRole(null, StaffFunction.RECEPTIONIST.toString ()));
            sRoleRepository.save(new SRole(null, StaffFunction.RH.toString ()));

            sUserServiceImplementation.saveUser( "admin@app.com", "admin", StaffFunction.ADMIN.toString () );
            sUserServiceImplementation.saveUser( "director@app.com", "director", StaffFunction.DIRECTOR.toString () );

            sUserServiceImplementation.saveUser( "doctor@app.com", "doctor", StaffFunction.DOCTOR.toString () );
            sUserServiceImplementation.saveUser( "pharmacist@app.com", "pharmacist", StaffFunction.PHARMACIST.toString ());

            sUserServiceImplementation.saveUser ( "receptionist@app.com", "receptionist", StaffFunction.RECEPTIONIST.toString () );
            sUserServiceImplementation.saveUser ( "rh@app.com", "rh", StaffFunction.RH.toString () );

        };
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
