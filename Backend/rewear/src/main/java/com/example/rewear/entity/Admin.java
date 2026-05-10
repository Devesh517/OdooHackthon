package com.example.rewear.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String adminLevel;

    private String permissions;

    private Timestamp createdAt;

    // getters setters
}