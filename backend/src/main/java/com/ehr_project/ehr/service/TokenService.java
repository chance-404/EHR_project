package com.ehr_project.ehr.service;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ehr_project.ehr.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenService {
  // value stored in application.properties
  @Value("${jwt.secret}")
  private String jwtSecret;

  public String generateToken (User user) {
    SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    
    return Jwts.builder()
      .subject(user.getUserId())
      .claim("firstName", user.getFirstName())
      .claim("lastName", user.getLastName())
      .claim("roles", user.getUserRole())
      .issuedAt(new Date(System.currentTimeMillis()))
      .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // 30min
      .signWith(key)
      .compact();
  }

  public Claims getAllClaimsFromToken(String token) {
    SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    
    return Jwts.parser()
      .verifyWith(key)
      .build()
      .parseSignedClaims(token)
      .getPayload();
  }

  public String getUserIdFromToken(String token) {
    return getAllClaimsFromToken(token).getSubject();
  }

  public String getRoleFromToken(String token) {
    return getAllClaimsFromToken(token).get("roles", String.class);
  }
}
