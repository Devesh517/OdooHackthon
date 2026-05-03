package com.example.rewear.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String username;
    private String password;
    private String phone;
}