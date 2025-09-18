package com.studysync.dto;

import jakarta.validation.constraints.NotBlank;

public class ForumAnswerRequest {
    @NotBlank
    private String content;

    public ForumAnswerRequest() {}

    public ForumAnswerRequest(String content) {
        this.content = content;
    }

    // Getters and Setters
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
