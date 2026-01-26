package com.ehr_project.ehr.repo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ehr_project.ehr.model.Provider;

@Repository
public interface ProviderRepo extends JpaRepository<Provider, UUID> {

	Optional<Provider> findProviderById(UUID id);

	List<Provider> findBySpecialtyIgnoreCase(String specialty);
}
