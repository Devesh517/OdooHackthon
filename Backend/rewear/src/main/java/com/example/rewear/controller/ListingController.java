package com.example.rewear.controller;

import com.example.rewear.dto.ListingRequest;
import com.example.rewear.entity.Listing;
import com.example.rewear.entity.User;
import com.example.rewear.repository.ListingRepository;
import com.example.rewear.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "*")
public class ListingController {

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public Listing addListing(
            @RequestBody ListingRequest request,
            Authentication authentication
    ) {

        String username = authentication.getName();

        User user = userRepository
                .findByUsername(username)
                .orElseThrow();

        if (!user.getRole().equals("USER")) {

            throw new RuntimeException(
                    "Admins cannot create listings"
            );
        }

        Listing listing = new Listing();

        listing.setTitle(request.getTitle());
        listing.setCategory(request.getCategory());
        listing.setSize(request.getSize());
        listing.setConditionType(request.getConditionType());
        listing.setPoints(0);
        listing.setDescription(request.getDescription());
        listing.setImageUrl(request.getImageUrl());

        listing.setUser(user);

        return listingRepository.save(listing);
    }

    // ✅ GET USER LISTINGS
    @GetMapping("/my")
    public List<Listing> getMyListings(Authentication authentication) {

        String username = authentication.getName();

        User user = userRepository
                .findByUsername(username)
                .orElseThrow();

        if (!user.getRole().equals("USER")) {

            throw new RuntimeException(
                    "Admins cannot access user listings"
            );
        }

        return listingRepository.findByUser(user);
    }
    @GetMapping("/feed")
    public List<Listing> getMarketplaceFeed(
            Authentication authentication
    ) {

        String username = authentication.getName();

        User currentUser = userRepository
                .findByUsername(username)
                .orElseThrow();

        return listingRepository.findByStatusAndUserNot(
                "APPROVED",
                currentUser
        );
    }
}