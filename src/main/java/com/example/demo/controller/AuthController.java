package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {

        User created = userService.registerUser(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                new RegisteredUserView(created.getName(), created.getEmail(), created.getRole())
        );
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {

        LoginResponse response = userService.loginUser(request.getEmail(), request.getPassword());

        return ResponseEntity.ok(response);
    }

    /** Small response shape for registration so we never echo back the password hash. */
    private record RegisteredUserView(String name, String email, String role) {}
}
