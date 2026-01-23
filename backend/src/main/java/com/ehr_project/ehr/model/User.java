package com.ehr_project.ehr.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

	@Id
  	@Column(nullable = false, unique = true)
  	private String userId;

  	@Column(nullable = false)
  	private String lastName;

  	@Column(nullable = false)
  	private String firstName;

	@Enumerated(EnumType.STRING)
  	private UserRole userRole;

  	@Column(nullable = false)
  	private String password;
 
}