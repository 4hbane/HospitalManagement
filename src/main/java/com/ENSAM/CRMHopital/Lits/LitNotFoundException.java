package com.ENSAM.CRMHopital.Lits;

import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class LitNotFoundException extends NotFoundException {
    public LitNotFoundException(String msg) {
        super ( msg );
    }
}
