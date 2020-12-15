package com.ENSAM.CRMHopital.Medicaments;

import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class MedicamentNotFoundException extends NotFoundException {
    public MedicamentNotFoundException(String msg) {
        super ( msg );
    }
}
