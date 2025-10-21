package com.ehr_project.ehr.model;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "patients")
public class Patient implements Serializable{
    @Id
    @Column(nullable = false)
    private Long mrn = null;

    @Column(nullable = false)
    private String lastName;
    
    private String middleName;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Transient
    private Integer age;

    public Integer getAge() {
        if (dateOfBirth == null) {
            return null;
        }
        return LocalDate.now().getYear() - dateOfBirth.getYear();
    }

    @Column(nullable = false)
    private String sex;

    @Transient // this annotation tells DB to ignore it, age will change frequently
    private String ageString;

    public Long getMrn() {
        return mrn;
    }
    public void setMrn(Long mrn) {
        this.mrn = mrn;
    }

    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }
    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getSex() {
        return sex;
    }
    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAgeString() {
        return ageString;
    }
    public void setAgeString(String ageString) {
        this.ageString = ageString;
    }






    
}

