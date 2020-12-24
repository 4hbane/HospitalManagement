package com.mna.crmhospital.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SUserController {
    @GetMapping("/login")
    public String login() {
        return "Hi, motherfucker.";
    }
}
