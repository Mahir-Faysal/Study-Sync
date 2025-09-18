package com.studysync.service;

import com.studysync.dto.ExamAnalyticsResponse;
import com.studysync.model.Exam;
import com.studysync.model.Question;
import com.studysync.model.User;
import com.studysync.repository.AnswerRepository;
import com.studysync.repository.ExamAttemptRepository;
import com.studysync.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private ExamAttemptRepository examAttemptRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private AuthService authService;

    public ExamAnalyticsResponse getExamAnalytics(Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        User currentUser = authService.getCurrentUser();
        if (!exam.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can only view analytics for your own exams");
        }

        if (exam.getStatus() != Exam.Status.COMPLETED) {
            throw new RuntimeException("Analytics are only available for completed exams");
        }

        long totalAttempts = examAttemptRepository.countByExam(exam);
        Double averageScore = examAttemptRepository.findAverageScoreByExam(exam);

        ExamAnalyticsResponse response = new ExamAnalyticsResponse(
                exam.getId(),
                exam.getTitle(),
                totalAttempts,
                averageScore != null ? averageScore : 0.0
        );

        // Generate question-wise analytics
        List<ExamAnalyticsResponse.QuestionAnalytics> questionAnalytics = exam.getQuestions().stream()
                .map(question -> {
                    long correctAnswers = answerRepository.countCorrectAnswersByQuestionAndExam(question, examId);
                    long totalAnswers = answerRepository.countTotalAnswersByQuestionAndExam(question, examId);
                    
                    return new ExamAnalyticsResponse.QuestionAnalytics(
                            question.getId(),
                            question.getQuestionText(),
                            correctAnswers,
                            totalAnswers
                    );
                })
                .collect(Collectors.toList());

        response.setQuestionAnalytics(questionAnalytics);
        return response;
    }

    public List<ExamAnalyticsResponse> getMyExamAnalytics() {
        User currentUser = authService.getCurrentUser();
        List<Exam> completedExams = examRepository.findByCreatedByAndStatusOrderByCreatedAtDesc(
                currentUser, Exam.Status.COMPLETED);

        return completedExams.stream()
                .map(exam -> {
                    long totalAttempts = examAttemptRepository.countByExam(exam);
                    Double averageScore = examAttemptRepository.findAverageScoreByExam(exam);
                    
                    return new ExamAnalyticsResponse(
                            exam.getId(),
                            exam.getTitle(),
                            totalAttempts,
                            averageScore != null ? averageScore : 0.0
                    );
                })
                .collect(Collectors.toList());
    }
}
