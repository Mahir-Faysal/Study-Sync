package com.studysync.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ForumQuestionResponse {
    private Long id;
    private String title;
    private String description;
    private String tag;
    private String postedByUsername;
    private LocalDateTime createdAt;
    private int answersCount;
    private List<ForumAnswerResponse> answers;

    public ForumQuestionResponse() {}

    public ForumQuestionResponse(Long id, String title, String description, String tag, 
                                String postedByUsername, LocalDateTime createdAt, int answersCount) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.tag = tag;
        this.postedByUsername = postedByUsername;
        this.createdAt = createdAt;
        this.answersCount = answersCount;
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

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getPostedByUsername() {
        return postedByUsername;
    }

    public void setPostedByUsername(String postedByUsername) {
        this.postedByUsername = postedByUsername;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public int getAnswersCount() {
        return answersCount;
    }

    public void setAnswersCount(int answersCount) {
        this.answersCount = answersCount;
    }

    public List<ForumAnswerResponse> getAnswers() {
        return answers;
    }

    public void setAnswers(List<ForumAnswerResponse> answers) {
        this.answers = answers;
    }
}
