package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.Staff;
import com.mna.crmhospital.entities.StaffFunction;
import com.mna.crmhospital.entities.StaffStatus;
import com.mna.crmhospital.repositories.StaffRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
@AllArgsConstructor
public class StaffController {

    private final StaffRepository staffRepository;

    @GetMapping("/personnels")
    public List<Staff> getStaffs() { return staffRepository.findAll(); }

    @GetMapping("/personnels/{id}")
    public Staff getStaff(@PathVariable Long id) {
        Optional<Staff> staff = staffRepository.findById(id);
        return staff.orElse(null);
    }

    @GetMapping("/personnels/email/{email}")
    public Staff getStaffByEmail(@PathVariable String email) {
        return staffRepository.findByEmail(email);
    }

    @GetMapping("/personnels/cin/{partCIN}")
    public List<Staff> getStaffByCINContains(@PathVariable String partCIN) {
        return staffRepository.findByCINContains(partCIN);
    }

    @GetMapping("/personnels/service/{service}")
    public List<Staff> getStaffByService(@PathVariable String service) {
        return staffRepository.findByService(service);
    }

    @GetMapping("/personnels/function/{function}")
    public List<Staff> getStaffByFunction(@PathVariable StaffFunction function) {
        return staffRepository.findBySfunction(function);
    }

    @GetMapping("/personnels/status/{status}")
    public List<Staff> getStaffByStatus(@PathVariable StaffStatus status) {
        return staffRepository.findByStatus(status);
    }

    @GetMapping("/personnels/nombre/function/{function}")
    public Long getCountByFunction(@PathVariable StaffFunction function) {
            return staffRepository.countBySfunction(function);
    }


    @PostMapping("/personnels")
    public Staff saveStaff(@RequestBody Staff staff) {
        staff.setId(null); // Avoid update.
        return staffRepository.save(staff);
    }

    @PutMapping("/personnels/{id}")
    public Staff updateStaff(@RequestBody Staff staff, @PathVariable Long id) {
        if(staffRepository.existsById(id) && staff.getId().equals(id)) {
            return staffRepository.save(staff);
        }
        return null;
    }

    @DeleteMapping("/personnels/{id}")
    public void deleteStaff(@PathVariable Long id) {
        if(staffRepository.existsById(id))
            staffRepository.deleteById(id);
    }
}
