package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.SUser;
import com.mna.crmhospital.repositories.SRoleRepository;
import com.mna.crmhospital.repositories.SUserRepository;
import com.mna.crmhospital.services.AccountService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@Data
class RBUser {
    private String username;
    private String password;
    private String role;
}
@AllArgsConstructor
@Data
class UpdateUser {
    private String username;
    private String password;
    private String newPassword;
    private String confirmPassword;
}

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api")
@AllArgsConstructor
public class SUserController {

    // Get User
    private final SUserRepository sUserRepository;
    private final SRoleRepository sRoleRepository;
    private final AccountService accountService;

    @GetMapping("/utilisateurs")
    public List<SUser> getUsers() { return sUserRepository.findAll(); }


    @GetMapping("/utilisateurs/{id}")
    public SUser getUser(@PathVariable Long id) {
        if(sUserRepository.findById(id).isPresent()) {
            return sUserRepository.findById(id).get();
        }
        return null;
    }

    @PostMapping("/utilisateurs")
    public SUser saveUser(@RequestBody RBUser user) {
        if(!sUserRepository.existsByUsername(user.getUsername())) {
            SUser sUser = new SUser(null, user.getUsername(), user.getPassword(), true, sRoleRepository.findSRoleByName(user.getRole()));
            sUserRepository.save(sUser);
            return sUser;
        }
        return sUserRepository.findSUserByUsername(user.getUsername());
    }

    @PutMapping("/utilisateurs")
    public Boolean updateUser(@RequestBody UpdateUser user) {
        return accountService.updateUserPassword ( user.getUsername (), user.getPassword (),
                user.getNewPassword (), user.getConfirmPassword ());
    }

    @PutMapping("/utilisateurs/deactiver/{id}")
    public void toggleActiveUser(@PathVariable Long id) {
        if(sUserRepository.findById(id).isPresent()) {
            SUser user = sUserRepository.findById(id).get();
            user.setActivated(!user.isActivated());
            sUserRepository.save(user);
        }
    }


    @DeleteMapping("/utilisateurs/{id}")
    public void deleteUser(@PathVariable Long id) {
        sUserRepository.deleteById(id);
    }

}
