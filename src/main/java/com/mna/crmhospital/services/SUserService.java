package com.mna.crmhospital.services;

import com.mna.crmhospital.entities.SUser;

public interface SUserService {
    SUser saveUser(String username , String password , String role);
}
