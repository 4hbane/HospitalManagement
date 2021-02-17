package com.mna.crmhospital.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mna.crmhospital.entities.SUser;
import com.mna.crmhospital.repositories.SUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;
    private SUserRepository sUserRepository;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, SUserRepository sUserRepository){
        this.authenticationManager = authenticationManager;
        this.sUserRepository = sUserRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            SUser user = new ObjectMapper().readValue(request.getInputStream(), SUser.class);
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        // Get User, find SUser by User.getUsername(), build JWT. Add JWT to response header
        User user = (User) authResult.getPrincipal();
        List<String> roles = new ArrayList<>();
        user.getAuthorities().forEach(a -> roles.add(a.getAuthority()));

        SUser sUser = sUserRepository.findSUserByUsername(user.getUsername());
        if(sUser.isActivated()) {
            String jwtToken = JWT.create ()
                    .withIssuer(request.getRequestURI())
                    .withSubject (user.getUsername())
                    .withArrayClaim("roles", roles.toArray(new String[roles.size()]))
                    .withExpiresAt (new Date(System.currentTimeMillis () + SecurityConstants.EXPIRATION_TIME))
                    .sign(Algorithm.HMAC256 ( SecurityConstants.SECRET));

            response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + jwtToken);
            response.addHeader ( SecurityConstants.USERNAME_CONNECTED, user.getUsername ());
            response.addHeader ( SecurityConstants.USER_ROLE_CONNECTED,roles.get ( 0 ) );
        }
        else {
            response.setStatus(401);
        }
    }
}
