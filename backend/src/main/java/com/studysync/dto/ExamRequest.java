package com.studysync.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class ExamRequest {
    @NotBlank
    private String title;

    private String description;

    @NotEmpty
    private List<Long> questionIds;

    public ExamRequest() {}

    public ExamRequest(String title, String description, List<Long> questionIds) {
        this.title = title;
        this.description = description;
        this.questionIds = questionIds;
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

    public List<Long> getQuestionIds() {
        return questionIds;
    }

    public void setQuestionIds(List<Long> questionIds) {
        this.questionIds = questionIds;
    }
}
