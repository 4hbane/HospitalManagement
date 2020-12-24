package com.mna.crmhospital.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class AdminFolder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long folderNumber;
    private String firstName;
    private String lastName;
    private String gender;
    private Date dateOfBirth;
    private String address;
    private Long postalCode;
    private String maritalStatus;
    private String profession;
    private String phoneNumber;
    private String CIN;
    private String socialSecurityNumber;
    private Long medicalFolderNumber;
}
