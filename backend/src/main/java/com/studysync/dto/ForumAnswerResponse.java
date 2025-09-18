package com.studysync.dto;

import java.time.LocalDateTime;

public class ForumAnswerResponse {
    private Long id;
    private String content;
    private String answeredByUsername;
    private LocalDateTime createdAt;

    public ForumAnswerResponse() {}

    public ForumAnswerResponse(Long id, String content, String answeredByUsername, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.answeredByUsername = answeredByUsername;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAnsweredByUsername() {
        return answeredByUsername;
    }

    public void setAnsweredByUsername(String answeredByUsername) {
        this.answeredByUsername = answeredByUsername;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
