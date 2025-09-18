package com.studysync.dto;

import jakarta.validation.constraints.NotBlank;

public class ForumQuestionRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private String tag; // Optional

    public ForumQuestionRequest() {}

    public ForumQuestionRequest(String title, String description, String tag) {
        this.title = title;
        this.description = description;
        this.tag = tag;
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
