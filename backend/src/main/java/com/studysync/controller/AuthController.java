package com.studysync.controller;

import com.studysync.dto.JwtResponse;
import com.studysync.dto.LoginRequest;
import com.studysync.dto.RegisterRequest;
import com.studysync.service.AuthService;
import com.studysync.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Login attempt for username: " + loginRequest.getUsername());
            JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
            System.out.println("Login successful for username: " + loginRequest.getUsername());
            return ResponseEntity.ok(jwtResponse);
        } catch (Exception e) {
            System.out.println("Login failed for username: " + loginRequest.getUsername() + ", Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        try {
            System.out.println("=== REGISTRATION DEBUG ===");
            System.out.println("Username: " + signUpRequest.getUsername());
            System.out.println("Email: " + signUpRequest.getEmail());
            System.out.println("First Name: " + signUpRequest.getFirstName());
            System.out.println("Last Name: " + signUpRequest.getLastName());
            System.out.println("Role: " + signUpRequest.getRole());
            System.out.println("Password length: " + (signUpRequest.getPassword() != null ? signUpRequest.getPassword().length() : "null"));
            System.out.println("========================");
            
            String message = authService.registerUser(signUpRequest);
            System.out.println("Registration successful for: " + signUpRequest.getUsername());
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            System.out.println("Registration failed for: " + signUpRequest.getUsername() + ", Error: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> testEndpoint() {
        return ResponseEntity.ok("Backend is running successfully!");
    }

    @PostMapping("/test-password")
    public ResponseEntity<?> testPassword(@RequestBody TestPasswordRequest request) {
        try {
            // Get user from database
            Optional<com.studysync.model.User> userOpt = userRepository.findByUsername(request.getUsername());
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            com.studysync.model.User user = userOpt.get();
            boolean matches = passwordEncoder.matches(request.getRawPassword(), user.getPassword());
            
            return ResponseEntity.ok(Map.of(
                "username", user.getUsername(),
                "passwordMatches", matches,
                "encodedPassword", user.getPassword().substring(0, 20) + "...",
                "rawPasswordLength", request.getRawPassword().length()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    public static class TestPasswordRequest {
        private String username;
        private String rawPassword;
        
        // Getters and setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getRawPassword() { return rawPassword; }
        public void setRawPassword(String rawPassword) { this.rawPassword = rawPassword; }
    }
}
