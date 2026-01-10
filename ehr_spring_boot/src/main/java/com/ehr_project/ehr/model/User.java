package com.ehr_project.ehr.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

  @Id
  @Column(nullable = false, unique = true)
  private String userId;

  @Column(nullable = false)
  private String lastName;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String userRole;

  @Column(nullable = false)
  private String password;

  public User() {}

    public User(String userId, String password, String firstName, String lastName, String userRole) {
      this.userId = userId;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.userRole = userRole;
    } 

  public String getUserId() {
      return userId;
  }
  public void setUserId(String userId) {
      this.userId = userId;
  }

  public String getLastName() {
      return lastName;
  }
  public void setLastName(String lastName) {
      this.lastName = lastName;
  }

  public String getFirstName() {
      return firstName;
  }
  public void setFirstName(String firstName) {
      this.firstName = firstName;
  }

  public String getPassword() {
      return password;
  }
  public void setPassword(String password) {
      this.password = password;
  }

  public String getUserRole() {
      return userRole;
  }
  public void setUserRole(String userRole) {
      this.userRole = userRole;
  }
}