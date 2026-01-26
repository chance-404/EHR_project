package com.ehr_project.ehr.repo;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ehr_project.ehr.model.ImagingStudy;

@Repository
public interface ImagingStudyRepo extends JpaRepository<ImagingStudy, UUID>{

	List<ImagingStudy> findImagingStudyByPatientMrn(UUID patientMrn);
}
