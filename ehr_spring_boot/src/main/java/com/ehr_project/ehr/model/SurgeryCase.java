package com.ehr_project.ehr.model;

import java.io.Serializable;
import java.sql.Time;

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

  @Column(nullable = false)
  private String anesthesia;

  @Column
  private String nurse;

  @Column 
  private String scrub;

  @Column
  private String patient;

  @Column 
  private Integer roomId;

  @Column
  private Time startTime;

  @Column 
  private Time endTime;

  @Column
  private String surgeryCaseStatus;

  

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

  public String getNurse() {
      return nurse;
  }
  public void setNurse(String nurse) {
      this.nurse = nurse;
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

  public String getAnesthesia() {
      return anesthesia;
  }
  public void setAnesthesia(String anesthesia) {
      this.anesthesia = anesthesia;
  }

  public Time getStartTime() {
      return startTime;
  }
  public void setStartTime(Time startTime) {
      this.startTime = startTime;
  }

  public Time getEndTime() {
      return endTime;
  }
  public void setEndTime(Time endTime) {
      this.endTime = endTime;
  }

  public String getSurgeryCaseStatus() {
      return surgeryCaseStatus;
  }
  public void setSurgeryCaseStatus(String surgeryCaseStatus) {
      this.surgeryCaseStatus = surgeryCaseStatus;
  }

}
