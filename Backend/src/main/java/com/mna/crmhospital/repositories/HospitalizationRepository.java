package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.Hospitalization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalizationRepository extends JpaRepository<Hospitalization, Long> {
}
