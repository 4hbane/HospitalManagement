package com.mna.crmhospital.repositories;

import com.mna.crmhospital.entities.Staff;
import com.mna.crmhospital.entities.StaffFunction;
import com.mna.crmhospital.entities.StaffStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    List<Staff> findByCINContains(String CIN);
    List<Staff> findByService(String service);
    List<Staff> findBySfunction(StaffFunction function);
    List<Staff> findByStatus(StaffStatus status);
    Staff findByEmail(String email);
    Long countBySfunction(StaffFunction function);
    //List<Staff> countByFunction(StaffFunction function);
}
