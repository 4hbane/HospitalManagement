package com.mna.crmhospital.services;


import com.mna.crmhospital.entities.SRole;
import com.mna.crmhospital.entities.SUser;

public interface AccountService {
   public boolean updateUserPassword(String userName, String oldPassword, String newPassword, String confirmPassword);
    public SUser activateDeactivateUser(String userName);
    public SRole save(SRole role);
    public SUser loadUserByUserName(String userName);
}
