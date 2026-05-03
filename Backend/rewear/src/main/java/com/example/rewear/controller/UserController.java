package com.example.rewear.controller;

import com.example.rewear.entity.User;
import com.example.rewear.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository repo;

    @GetMapping("/profile")
    public User getProfile(Authentication authentication) {

        String username = authentication.getName();

        return repo.findByUsernameOrEmail(username, username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}