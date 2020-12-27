package com.mna.crmhospital.controllers;

import com.mna.crmhospital.entities.AdminFolder;
import com.mna.crmhospital.repositories.AdminFolderRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api")
@AllArgsConstructor
public class AdminFolderController {

    private final AdminFolderRepository adminFolderRepository;

    @GetMapping("/dossiersAdministratifs")
        public List<AdminFolder> getFolders() {
        return adminFolderRepository.findAll();
    }

    @GetMapping("/dossiersAdministratifs/{folderNumber}")
    public AdminFolder getFolderById(@PathVariable Long folderNumber) {
        Optional<AdminFolder> adminFolder = adminFolderRepository.findById(folderNumber);
        return adminFolder.orElse(null);
    }

    @PostMapping("/dossiersAdministratifs")
    public AdminFolder saveFolder(@RequestBody AdminFolder adminFolder) {
        return adminFolderRepository.save(adminFolder);
    }

    @PutMapping("/dossiersAdministratifs/{folderNumber}")
    public AdminFolder updateFolder(@RequestBody AdminFolder adminFolder, @PathVariable Long folderNumber) {
        if(adminFolderRepository.existsById(folderNumber) && adminFolder.getFolderNumber().equals(folderNumber)) { //NOTE(): Avoid sending object with different id than passed in param.
            return adminFolderRepository.save(adminFolder);
        }
        return null;
    }

    @DeleteMapping("/dossiersAdministratifs/{folderNumber}")
    public void deleteFolder(@PathVariable Long folderNumber) {
        if (adminFolderRepository.existsById(folderNumber))
            adminFolderRepository.deleteById(folderNumber);
    }

    // Facture

}
