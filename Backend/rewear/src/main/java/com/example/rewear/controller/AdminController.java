package com.example.rewear.controller;

import com.example.rewear.entity.Listing;
import com.example.rewear.entity.User;
import com.example.rewear.dto.ApproveListingRequest;
import com.example.rewear.repository.ListingRepository;
import com.example.rewear.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ListingRepository listingRepository;

    // =========================
    // GET ALL USERS
    // =========================

    @GetMapping("/users")
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // =========================
    // GET ALL LISTINGS
    // =========================

    @GetMapping("/listings")
    public List<Listing> getAllListings() {

        return listingRepository.findAll();
    }

    // =========================
    // DELETE USER
    // =========================

    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {

        userRepository.deleteById(id);

        return "User deleted successfully";
    }

    // =========================
    // DELETE LISTING
    // =========================

    @DeleteMapping("/listing/{id}")
    public String deleteListing(@PathVariable Long id) {

        listingRepository.deleteById(id);

        return "Listing deleted successfully";
    }

    // =========================
    // APPROVE LISTING
    // =========================

    @PutMapping("/listing/{id}/approve")
    public String approveListing(
            @PathVariable Long id,
            @RequestBody ApproveListingRequest request
    ) {

        Listing listing = listingRepository
                .findById(id)
                .orElseThrow();

        listing.setStatus("APPROVED");

        listing.setPoints(request.getPoints());

        listingRepository.save(listing);

        return "Listing approved with points";
    }
}