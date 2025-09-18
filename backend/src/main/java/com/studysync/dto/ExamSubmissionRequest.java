package com.studysync.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.Map;

public class ExamSubmissionRequest {
    @NotEmpty
    private Map<Long, String> answers; // questionId -> selectedAnswer (A, B, C, D)

    public ExamSubmissionRequest() {}

    public ExamSubmissionRequest(Map<Long, String> answers) {
        this.answers = answers;
    }

    // Getters and Setters
    public Map<Long, String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<Long, String> answers) {
        this.answers = answers;
    }
}
