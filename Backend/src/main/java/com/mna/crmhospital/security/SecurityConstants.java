package com.mna.crmhospital.security;

public class SecurityConstants {
public static final String SECRET = "helloworld";
    public static final long EXPIRATION_TIME= 864_000; //10 days
    public static final String TOKEN_PREFIX ="Bearer ";
    public static final String HEADER_STRING="Authorization";
    public static final String USERNAME_CONNECTED="username";
    public static final String USER_ROLE_CONNECTED="role";
}
