package com.ENSAM.CRMHopital;

import com.ENSAM.CRMHopital.Lits.Lit;
import com.ENSAM.CRMHopital.Lits.LitRepository;
import com.ENSAM.CRMHopital.Medicaments.Medicament;
import com.ENSAM.CRMHopital.Medicaments.MedicamentRepository;
import com.ENSAM.CRMHopital.Medicaments.MedicamentType;
import com.ENSAM.CRMHopital.Personnels.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Calendar;
import java.util.Date;

@SpringBootApplication
public class CrmHopitalApplication {

	public static void main(String[] args)
	{
		SpringApplication.run(CrmHopitalApplication.class, args);
	}
	@Bean
	CommandLineRunner start(PersonnelRepository personnelRepository, MedicamentRepository medicamentRepository, LitRepository litRepository                         ){
		return args -> {
			Calendar dd = Calendar.getInstance ();
			dd.add ( Calendar.DATE,1 );

			personnelRepository.save ( new Personnel ( null, "Abdellah","Ahbane","KK7801","abdellah@ahbane.me","00778833","Hay Anda, Aoulouz", new Date (  ), Gender.MALE, PersonnelStatus.ACTIVE,"Cardiologie", PersonnelFunction.DOCTOR, new Date (  ) ) );
			personnelRepository.save ( new Personnel ( null, "Mounib","Elboujbaoui","KM78001","contact@mounib.me","00993377","Sidi Ifni", new Date (  ), Gender.MALE, PersonnelStatus.ACTIVE,"Endocrinologie", PersonnelFunction.DOCTOR, new Date (  ) ) );

			medicamentRepository.save ( new Medicament ( null, "A0001",MedicamentType.BIOLOGIQUE, dd.getTime ()) );
			dd.add ( Calendar.DATE, -6 );
			medicamentRepository.save ( new Medicament ( null, "A0001",MedicamentType.A_BASE_DE_PLANTES, dd.getTime ()) );

			litRepository.save ( new Lit ( "BB1", 2L, "Cardiologie") );
			litRepository.save ( new Lit ( "BB1", 1L, "Cardiologie") );
			Lit newLit = new Lit ( "BB1", 1L, "Cardiologie" );
			newLit.setIsOccupied ( true );
			litRepository.save ( newLit );
		};
	}

}
