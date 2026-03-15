package com.ehr_project.ehr.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;

@Entity
@Table(name = "staging_patients")
@Data
@JsonIgnoreProperties({
    "medications",
    "allergies",
    "encounters",
    "imagingStudies",
    "procedures",
    "providers",
    "observations",
    "conditions",
    "hibernateLazyInitializer",
    "handler"
})
public class Patient implements Serializable{
    @Id
	@GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
    private UUID mrn = null;

    @Column(name = "first_name", nullable = false)
    private String firstName;
    
	@Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "birthdate", nullable = false)
    private LocalDate dateOfBirth;

	@Column(name = "gender", nullable = false)
    private String sex;

	@OneToMany(mappedBy = "patient", fetch = FetchType.LAZY)
	private List<Medication> medications;

	@OneToMany(mappedBy = "patient", fetch = FetchType.LAZY)
	private List<Allergy> allergies;

	@OneToMany(mappedBy = "patient", fetch = FetchType.LAZY)
	private List<Encounter> encounters;

	@OneToMany(mappedBy = "patient", fetch = FetchType.LAZY)
	private List<ImagingStudy> imagingStudies;

	@OneToMany(mappedBy = "patient", fetch = FetchType.LAZY)
	private List<Procedure> procedures;

	@ManyToMany(mappedBy = "patients", fetch = FetchType.LAZY)
	private List<Provider> providers;

	@OneToMany(mappedBy = "patient", fetch = FetchType.LAZY)
	private List<Observation> observations;

	@OneToMany(mappedBy = "patient", fetch = FetchType.LAZY)
	private List<Condition> conditions;

    public Integer getAge() {
        if (dateOfBirth == null) {
            return null;
        }
		return java.time.Period.between(dateOfBirth, LocalDate.now()).getYears();
    }

    @Transient // this annotation tells DB to ignore it, age will change frequently
    private String ageString;
    
}

