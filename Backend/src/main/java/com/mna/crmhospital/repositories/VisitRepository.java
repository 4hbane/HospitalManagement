package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepository extends JpaRepository<Visit, Long> {
}
