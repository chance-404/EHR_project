package com.ehr_project.ehr;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ehr_project.ehr.exceptions.UserNotFoundException;
import com.ehr_project.ehr.model.User;
import com.ehr_project.ehr.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
      List<User> users = userService.findAllUsers();
      return new ResponseEntity<>(users, HttpStatus.OK);
    }

  @GetMapping("/{userId}")
  public ResponseEntity<User> getUserByUserId(@PathVariable("userId") String userId) {
    User user = userService.findUserByUserId(userId);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    try {
      User user = userService.findUserByUserId(loginRequest.getUserId());
            
            
      if (user.getPassword().equals(loginRequest.getPassword())) {
        // Remove password from response for security
        LoginResponse response = new LoginResponse(
            user.getUserId()
        );
        return ResponseEntity.ok(response);
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(Map.of("error", "Invalid credentials"));
    }
            
    } catch (UserNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of("error", "User not found"));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("error", "Login failed"));
    }
    }

  // Inner classes for request/response
    public static class LoginRequest {
      private String userId;
      private String password;

      // Constructors
      public LoginRequest() {}

      public LoginRequest(String userId, String password) {
        this.userId = userId;
        this.password = password;
      }

      public String getUserId() {
        return userId;
      }

      public void setUserId(String userId) {
        this.userId = userId;
      }

      public String getPassword() {
        return password;
      }

      public void setPassword(String password) {
        this.password = password;
      }
  }

  public static class LoginResponse {
    private String userId;

    public LoginResponse(String userId) {
      this.userId = userId;
    }

      // Getters and setters
      public String getUserId() {
        return userId;
      }

      public void setUserId(String userId) {
        this.userId = userId;
      }

    }    

}
