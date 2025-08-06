package com.ehr_project.ehr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ehr_project.ehr.exceptions.UserNotFoundException;
import com.ehr_project.ehr.model.User;
import com.ehr_project.ehr.repo.UserRepo;

@Service
public class UserService {
    private final UserRepo UserRepo;

    @Autowired
    public UserService(UserRepo UserRepo) {
        this.UserRepo = UserRepo;
    }

    public User addUser(User User){
        return UserRepo.save(User);
    }

    public List<User> findAllUsers() {
        return UserRepo.findAll();
    }

    public User updateUser(User User) {
        return UserRepo.save(User);
    }

    public User findUserByUserId(String userId) {
        return UserRepo.findUserByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException("User by User ID " + userId + " was not found."));
    }

    public void deleteUser(String userId) {
        UserRepo.deleteUserByUserId(userId);
    }

    
}
