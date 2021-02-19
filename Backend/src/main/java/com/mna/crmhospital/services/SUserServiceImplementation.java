package com.mna.crmhospital.services;

import com.mna.crmhospital.entities.SRole;
import com.mna.crmhospital.entities.SUser;
import com.mna.crmhospital.repositories.SRoleRepository;
import com.mna.crmhospital.repositories.SUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class SUserServiceImplementation implements SUserService {

    private SUserRepository sUserRepository;
    private SRoleRepository sRoleRepository;

    @Override
    public SUser saveUser(String username, String password, String role) {
        SRole r = sRoleRepository.findSRoleByName(role);
        return sUserRepository.save(new SUser(null, username, password, true, r));
    }
}
