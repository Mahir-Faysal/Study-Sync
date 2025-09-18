package com.studysync.dto;

import java.util.List;

public class ExamAnalyticsResponse {
    private Long examId;
    private String examTitle;
    private long totalAttempts;
    private Double averageScore;
    private List<QuestionAnalytics> questionAnalytics;

    public ExamAnalyticsResponse() {}

    public ExamAnalyticsResponse(Long examId, String examTitle, long totalAttempts, Double averageScore) {
        this.examId = examId;
        this.examTitle = examTitle;
        this.totalAttempts = totalAttempts;
        this.averageScore = averageScore;
    }

    // Getters and Setters
    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public String getExamTitle() {
        return examTitle;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public long getTotalAttempts() {
        return totalAttempts;
    }

    public void setTotalAttempts(long totalAttempts) {
        this.totalAttempts = totalAttempts;
    }

    public Double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(Double averageScore) {
        this.averageScore = averageScore;
    }

    public List<QuestionAnalytics> getQuestionAnalytics() {
        return questionAnalytics;
    }

    public void setQuestionAnalytics(List<QuestionAnalytics> questionAnalytics) {
        this.questionAnalytics = questionAnalytics;
    }

    public static class QuestionAnalytics {
        private Long questionId;
        private String questionText;
        private long correctAnswers;
        private long totalAnswers;
        private double correctPercentage;

        public QuestionAnalytics() {}

        public QuestionAnalytics(Long questionId, String questionText, long correctAnswers, long totalAnswers) {
            this.questionId = questionId;
            this.questionText = questionText;
            this.correctAnswers = correctAnswers;
            this.totalAnswers = totalAnswers;
            this.correctPercentage = totalAnswers > 0 ? (double) correctAnswers / totalAnswers * 100 : 0;
        }

        // Getters and Setters
        public Long getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }

        public String getQuestionText() {
            return questionText;
        }

        public void setQuestionText(String questionText) {
            this.questionText = questionText;
        }

        public long getCorrectAnswers() {
            return correctAnswers;
        }

        public void setCorrectAnswers(long correctAnswers) {
            this.correctAnswers = correctAnswers;
        }

        public long getTotalAnswers() {
            return totalAnswers;
        }

        public void setTotalAnswers(long totalAnswers) {
            this.totalAnswers = totalAnswers;
        }

        public double getCorrectPercentage() {
            return correctPercentage;
        }

        public void setCorrectPercentage(double correctPercentage) {
            this.correctPercentage = correctPercentage;
        }
    }
}
