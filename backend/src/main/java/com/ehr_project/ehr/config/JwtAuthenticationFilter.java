package com.ehr_project.ehr.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ehr_project.ehr.service.TokenService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  	@Autowired
  	private TokenService tokenService;

  	@Override
  	protected void doFilterInternal(
    	@SuppressWarnings("null") HttpServletRequest request,
    	@SuppressWarnings("null") HttpServletResponse response,
    	@SuppressWarnings("null") FilterChain filterChain
		) 
	throws ServletException, IOException {

    	// skip authentication for login endpoint and all OPTIONS preflight requests
    	String path = request.getRequestURI();

      	if (path.contains("/users/login") || HttpMethod.OPTIONS.name().equalsIgnoreCase(request.getMethod())) {
        	filterChain.doFilter(request, response);
        	return;
      	}

    	String token = null;

    	if (request.getCookies() != null) {
      		for (jakarta.servlet.http.Cookie cookie : request.getCookies()) {
        		if ("token".equals(cookie.getName())) {
          			token = cookie.getValue();
          			break;
        		}
      		}
    	}

    	if (token != null) {
      		try {
        		String userId = tokenService.getUserIdFromToken(token);
        		String role = tokenService.getRoleFromToken(token);
				List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        		if (role != null && !role.isEmpty()) {
          			authorities.add(new SimpleGrantedAuthority(role));
        		}

        		// create token and set in security context
        		UsernamePasswordAuthenticationToken authentication = 
          		new UsernamePasswordAuthenticationToken(userId, null, authorities);
        
        		SecurityContextHolder.getContext().setAuthentication(authentication);

      		} catch (ExpiredJwtException e) {
        		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        		response.getWriter().write("{\"error\": \"Token expired\"}");
        		return;

      		} catch (SignatureException | MalformedJwtException e) {
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				response.getWriter().write("{\"error\": \"Invalid token\"}");
				return;

      		} catch (Exception e) {
        		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        		response.getWriter().write("{\"error\": \"Authentication failed\"}");
        		return;
      		}
		} else {
			// if no token provided
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().write("{\"error\": \"No authentication token provided\"}");
			return;
		}

    	filterChain.doFilter(request, response);
  	}

}