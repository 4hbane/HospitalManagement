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

import java.util.Date;

@SpringBootApplication
public class CRMHospitalApplication {

    public static void main(String[] args) {
        SpringApplication.run(CRMHospitalApplication.class, args);
    }

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    CommandLineRunner start(PatientRepository patientRepository, MedicalFolderRepository medicalFolderRepository, HospitalizationRepository hospitalizationRepository, ConsultationRepository consultationRepository,
                            StaffRepository staffRepository, BedRepository bedRepository, DrugRepository drugRepository,
                            SRoleRepository sRoleRepository, SUserService sUserServiceImplementation) {
        return args -> {
            // AdminFolders, MedicalFolders and Hospitalizations
            patientRepository.save(new Patient(1L,"Manal","Outtaleb","Femme",new Date(),"ouarzazate", 45000L,"Celibataire","Ingenieur","0661363636","PL256987","cnops", 2L   ));
            patientRepository.save(new Patient(2L,"Majdouline","Outtaleb","Femme",new Date(),"ouarzazate", 45000L,"Celibataire","Ingenieur","0661363636","PL256907","cnops", null));
            patientRepository.save(new Patient(3L,"Abdou","Ahbane","Homme",new Date(),"aoulouz", 20000L,"marie","Ingenieur","0661363636","PL2504987","cnops",1L));
            patientRepository.save(new Patient(4L,"Mounib","Elboujbaoui","Homme",new Date(),"ifni", 55000L,"Celibataire","Ingenieur","0661363636","PL256687","cnops",null));
            //MedicalFolder dos =  medicalFolderRepository.save(new MedicalFolder(1L,"Diabetique","Positif au covid","Vitamine C", true, 3L));
            Bed bed = bedRepository.save(Bed.getInstance());
            Hospitalization h = hospitalizationRepository.save(new Hospitalization(1L, 3L, "Symptômes de corona", null, bed,"Dr. Outtaleb Manal","Reanimation"));
            Consultation c = consultationRepository.save(new Consultation(1L, 2L, "Symptômes de diabète", "Dr. Outtaleb Manal"));
            medicalFolderRepository.save(new MedicalFolder(2L,"Diabetique","Positif au covid","Vitamine C", false, 1L));


            // Staff, Beds and Drugs
            staffRepository.save(new Staff(null, "admin", "admin", "admin001", "admin@app.com", "0607080901", "Aoulouz", new Date(), Gender.MALE, StaffStatus.ACTIVE, "Administration", StaffFunction.ADMIN, new Date()));
            staffRepository.save(new Staff(null, "director", "director", "director001", "director@app.com", "0605070101", "Sidi Ifni", new Date(), Gender.MALE, StaffStatus.ACTIVE, "Administration", StaffFunction.DIRECTOR, new Date()));
            staffRepository.save(new Staff(null, "doctor", "doctor", "doctor001", "doctor@app.com", "06070445522", "Ouerzazate", new Date(), Gender.FEMALE, StaffStatus.ACTIVE, "Reanimation", StaffFunction.DOCTOR, new Date()));
            staffRepository.save(new Staff(null, "pharmacist", "pharmacist", "pharmacist001", "pharmacist@app.com", "0307080901", "Marrakesh", new Date(), Gender.FEMALE, StaffStatus.ACTIVE, "Pharmacie", StaffFunction.PHARMACIST, new Date()));
            staffRepository.save(new Staff(null, "receptionist", "receptionist", "receptionist001", "receptionist@app.com", "0333080901", "Mohammedia", new Date(), Gender.MALE, StaffStatus.ACTIVE, "Administration", StaffFunction.RECEPTIONIST, new Date()));
            staffRepository.save(new Staff(null, "rh", "rh", "rh001", "rh@app.com", "0333080901", "Mohammedia", new Date(), Gender.MALE, StaffStatus.ACTIVE, "Ressources Humaines", StaffFunction.RH, new Date()));



            bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());
            bedRepository.save(Bed.getInstance());

            drugRepository.save(new Drug(null, "Supradyn", DrugType.GENERIQUE,5.26, new Date(), h));
            drugRepository.save(new Drug(null, "Dolipran", DrugType.GENERIQUE,6.58,new Date(), c));
            drugRepository.save(new Drug(null, "Aspegic", DrugType.GENERIQUE,60.00, new Date(), c));


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
