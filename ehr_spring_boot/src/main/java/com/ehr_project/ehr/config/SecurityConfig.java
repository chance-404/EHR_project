package com.ehr_project.ehr.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  
  @Autowired
  private JwtAuthenticationFilter jwtAuthenticationFilter;

  @Value("${frontend.url}")
  private String frontendUrl;

  @Value("${backend.url}")
  private String backendUrl;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
        // disable csrf for stateless APIs
        .csrf(csrf -> csrf.disable())
        // session management is stateless for JWT
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(authz -> authz
            // all http reqs can access login
            .requestMatchers("/users/login").permitAll()
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            // allow authenticated users to GET data
            .requestMatchers(HttpMethod.GET, "/users/**", "/patients/**", "/surgeryCases/**", "/patient-info/**").authenticated()
            
            // allow authenticated users to POST data
            .requestMatchers(HttpMethod.POST,"/patients/**", "/surgeryCases/**", "/patient-info/**").authenticated()
            
            // allow authenticated users to PUT (update) data
            .requestMatchers(HttpMethod.PUT,"/patients/**", "/surgeryCases/**", "/patient-info/**").authenticated()
            
            // allow authenticated users to DELETE data
            .requestMatchers(HttpMethod.DELETE, "/surgeryCases/**").authenticated()

            // require authentication for all other reqs
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowCredentials(true);
    configuration.setAllowedOrigins(Arrays.asList(frontendUrl, backendUrl));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
    
}