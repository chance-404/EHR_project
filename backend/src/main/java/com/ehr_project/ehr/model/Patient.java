package com.ehr_project.ehr.model;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;

@Entity
@Table(name = "patients")
@Data
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

    @Transient // this annotation tells DB to ignore it, age will change frequently
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
    
}

