package com.ehr_project.ehr.repo;


import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ehr_project.ehr.model.Observation;

@Repository
public interface ObservationRepo extends JpaRepository<Observation, Long>{

	List<Observation> findByPatientMrn(UUID patientMrn , Pageable pageable);
}
