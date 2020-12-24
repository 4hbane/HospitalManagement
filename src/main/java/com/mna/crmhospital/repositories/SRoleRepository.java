package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.SRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SRoleRepository extends JpaRepository<SRole, Long> {
    SRole findSRoleByName(String name);
}
