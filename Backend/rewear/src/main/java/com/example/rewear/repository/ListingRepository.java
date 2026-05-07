package com.example.rewear.repository;

import com.example.rewear.entity.Listing;
import com.example.rewear.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingRepository extends JpaRepository<Listing, Long> {

    List<Listing> findByUser(User user);
}