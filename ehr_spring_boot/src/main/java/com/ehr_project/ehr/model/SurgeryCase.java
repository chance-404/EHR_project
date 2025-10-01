package com.ehr_project.ehr.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "surgeryCases")
public class SurgeryCase implements Serializable{
  
  @Id
  @Column(nullable = false, unique = true)
  private Long surgeryCaseId = null;

  @Column(nullable = false)
  private String procedure;

  @Column(nullable = false)
  private String surgeon;

  @Column
  private String circulator;

  @Column 
  private String scrub;

  @Column
  private String patient;

  @Column 
  private Integer roomId;

  public Long getSurgeryCaseId() {
      return surgeryCaseId;
  }

  public void setSurgeryCaseId(Long surgeryCaseId) {
      this.surgeryCaseId = surgeryCaseId;
  }

  public String getProcedure() {
      return procedure;
  }

  public void setProcedure(String procedure) {
      this.procedure = procedure;
  }

  public String getSurgeon() {
      return surgeon;
  }

  public void setSurgeon(String surgeon) {
      this.surgeon = surgeon;
  }

  public String getCirculator() {
      return circulator;
  }

  public void setCirculator(String circulator) {
      this.circulator = circulator;
  }

  public String getScrub() {
      return scrub;
  }

  public void setScrub(String scrub) {
      this.scrub = scrub;
  }

  public String getPatient() {
      return patient;
  }

  public void setPatient(String patient) {
      this.patient = patient;
  }

  public Integer getRoomId() {
      return roomId;
  }

  public void setRoomId(Integer roomId) {
      this.roomId = roomId;
  }

}
