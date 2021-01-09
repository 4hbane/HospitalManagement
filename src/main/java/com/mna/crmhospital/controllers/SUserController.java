package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.SUser;
import com.mna.crmhospital.repositories.SRoleRepository;
import com.mna.crmhospital.repositories.SUserRepository;
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

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api")
@AllArgsConstructor
public class SUserController {

    // Get User
    private final SUserRepository sUserRepository;
    private final SRoleRepository sRoleRepository;

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

    @PutMapping("/utilisateurs/")
    public SUser updateUser(@RequestBody RBUser user) {
        if(sUserRepository.existsByUsername(user.getUsername())) {
            SUser oldUser = sUserRepository.findSUserByUsername(user.getUsername());
            if(user.getPassword().equals("")){
                user.setPassword(oldUser.getPassword());
            }
            //NOTE(): Changing role is it's own controller.
            if(!user.getUsername().equals("")) oldUser.setUsername(user.getUsername());
            if(!user.getPassword().equals("")) oldUser.setPassword(user.getPassword());
            if(!user.getRole().equals("")) oldUser.setRole(sRoleRepository.findSRoleByName(user.getRole()));
            sUserRepository.save(oldUser);
        }
        return null;
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
