package com.example.rewear.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListingRequest {

    private String title;
    private String category;
    private String size;
    private String conditionType;
    private Integer points;
    private String description;
    private String imageUrl;
}