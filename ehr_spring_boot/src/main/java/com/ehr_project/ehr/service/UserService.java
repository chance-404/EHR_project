package com.ehr_project.ehr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ehr_project.ehr.exceptions.UserNotFoundException;
import com.ehr_project.ehr.model.User;
import com.ehr_project.ehr.repo.UserRepo;

@Service
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User addUser(User user){
        return userRepo.save(user);
    }

    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    public User updateUser(User user) {
        return userRepo.save(user);
    }

    public User findUserByuserId(String userId) {
        return userRepo.findUserByuserId(userId)
                .orElseThrow(() -> new UserNotFoundException("User by ID " + userId + " was not found."));
    }

    public void deleteUser(String userId) {
        userRepo.deleteUserByuserId(userId);
    }

    
}
