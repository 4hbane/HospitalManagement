package com.ENSAM.CRMHopital.Personnels;

import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class PersonnelNotFoundException extends NotFoundException {
    public PersonnelNotFoundException(String msg) {
        super ( msg );
    }
}
