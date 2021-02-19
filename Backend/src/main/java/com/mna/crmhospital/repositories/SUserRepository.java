package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.SUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SUserRepository extends JpaRepository<SUser, Long> {
    SUser findSUserByUsername(String username);
    boolean existsByUsername(String username);
}
