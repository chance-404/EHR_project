package com.ehr_project.ehr.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ehr_project.ehr.model.User;

public interface UserRepo extends JpaRepository<User, String> {

    Optional<User> findUserByUserId(String userId);

    public void deleteUserByUserId(String userId);
}