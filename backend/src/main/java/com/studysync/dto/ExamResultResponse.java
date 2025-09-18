package com.studysync.dto;

import java.time.LocalDateTime;

public class ExamResultResponse {
    private Long id;
    private String examTitle;
    private Integer score;
    private Integer totalQuestions;
    private Double percentage;
    private Boolean passed;
    private LocalDateTime completedAt;

    public ExamResultResponse() {}

    public ExamResultResponse(Long id, String examTitle, Integer score, Integer totalQuestions, 
                             Double percentage, Boolean passed, LocalDateTime completedAt) {
        this.id = id;
        this.examTitle = examTitle;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = percentage;
        this.passed = passed;
        this.completedAt = completedAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExamTitle() {
        return examTitle;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public Boolean getPassed() {
        return passed;
    }

    public void setPassed(Boolean passed) {
        this.passed = passed;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
