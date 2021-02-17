package com.mna.crmhospital.services;

import com.mna.crmhospital.entities.SRole;
import com.mna.crmhospital.entities.SUser;
import com.mna.crmhospital.repositories.SRoleRepository;
import com.mna.crmhospital.repositories.SUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class AccountServiceImplementation implements AccountService {
    @Autowired
    private SUserRepository userRepository;
    @Autowired
    private SRoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Override
    public boolean updateUserPassword(String userName, String oldPassword, String newPassword, String confirmPassword) {
        SUser user = userRepository.findSUserByUsername(userName);
        if( user == null) throw new RuntimeException(("User doesn't exists !"));
        if ( BCrypt.checkpw ( oldPassword, user.getPassword () ) && newPassword.equals ( confirmPassword ) ) {
            user.setPassword(bCryptPasswordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public SUser activateDeactivateUser(String userName) {
            SUser user = userRepository.findSUserByUsername(userName);
            if(user == null) throw new RuntimeException(("User doesn't exists !"));
            if ( user.isActivated () ){
                user.setActivated ( false );
            }else {
                user.setActivated ( true );
            }
           return userRepository.save ( user );
    }



    @Override
    public SRole save(SRole role) {
        return roleRepository.save(role);
    }

    @Override
    public SUser loadUserByUserName(String userName) {
        return userRepository.findSUserByUsername(userName);
    }



}
