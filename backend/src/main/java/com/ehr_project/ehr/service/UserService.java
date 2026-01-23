package com.ehr_project.ehr.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ehr_project.ehr.exceptions.UserNotFoundException;
import com.ehr_project.ehr.model.User;
import com.ehr_project.ehr.repo.UserRepo;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
      this.userRepo = userRepo;
      this.passwordEncoder = passwordEncoder;
    }

    public User addUser(User user){
      user.setPassword(passwordEncoder.encode((user.getPassword())));
      return userRepo.save(user);
    }

    public List<User> findAllUsers() {
      return userRepo.findAll();
    }

    public User updateUser(User user) {
      if (user.getPassword() != null && !user.getPassword().isEmpty()) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
      }
      return userRepo.save(user);
    }

    public User findUserByUserId(String userId) {
      return userRepo.findUserByUserId(userId)
        .orElseThrow(() -> new UserNotFoundException("User by User ID " + userId + " was not found."));
    }

    public void deleteUser(String userId) {
      userRepo.deleteUserByUserId(userId);
    }

    public boolean verifyPassword(String rawPassword, String hashedPassword) {
      return passwordEncoder.matches(rawPassword, hashedPassword);
    }
    
}
