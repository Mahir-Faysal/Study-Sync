package com.studysync.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ExamResponse {
    private Long id;
    private String title;
    private String description;
    private String status;
    private String createdByUsername;
    private LocalDateTime createdAt;
    private int totalQuestions;
    private List<QuestionResponse> questions;

    public ExamResponse() {}

    public ExamResponse(Long id, String title, String description, String status, 
                       String createdByUsername, LocalDateTime createdAt, int totalQuestions) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.createdByUsername = createdByUsername;
        this.createdAt = createdAt;
        this.totalQuestions = totalQuestions;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedByUsername() {
        return createdByUsername;
    }

    public void setCreatedByUsername(String createdByUsername) {
        this.createdByUsername = createdByUsername;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public List<QuestionResponse> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionResponse> questions) {
        this.questions = questions;
    }
}
