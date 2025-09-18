package com.studysync.service;

import com.studysync.dto.*;
import com.studysync.model.*;
import com.studysync.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ExamAttemptRepository examAttemptRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private AuthService authService;

    @Transactional
    public ExamResponse createExam(ExamRequest request) {
        User currentUser = authService.getCurrentUser();
        
        if (currentUser.getRole() != User.Role.QUESTION_SETTER) {
            throw new RuntimeException("Only question setters can create exams");
        }

        Exam exam = new Exam(request.getTitle(), request.getDescription(), currentUser);

        // Add questions to the exam
        List<Question> questions = questionRepository.findAllById(request.getQuestionIds());
        if (questions.size() != request.getQuestionIds().size()) {
            throw new RuntimeException("Some questions not found");
        }

        for (Question question : questions) {
            exam.addQuestion(question);
        }

        Exam savedExam = examRepository.save(exam);
        return convertToResponse(savedExam, true);
    }

    public List<ExamResponse> getMyExams() {
        User currentUser = authService.getCurrentUser();
        List<Exam> exams = examRepository.findByCreatedByOrderByCreatedAtDesc(currentUser);
        return exams.stream()
                .map(e -> convertToResponse(e, true))
                .collect(Collectors.toList());
    }

    public List<ExamResponse> getActiveExams() {
        List<Exam> exams = examRepository.findByStatusOrderByCreatedAtDesc(Exam.Status.ACTIVE);
        return exams.stream()
                .map(e -> convertToResponse(e, false))
                .collect(Collectors.toList());
    }

    public ExamResponse getExamById(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        
        User currentUser = authService.getCurrentUser();
        boolean showAnswers = currentUser.getRole() == User.Role.QUESTION_SETTER 
                && exam.getCreatedBy().getId().equals(currentUser.getId());
        
        return convertToResponse(exam, showAnswers);
    }

    @Transactional
    public ExamResponse updateExamStatus(Long id, String status) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        User currentUser = authService.getCurrentUser();
        if (!exam.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can only update your own exams");
        }

        exam.setStatus(Exam.Status.valueOf(status));
        Exam updatedExam = examRepository.save(exam);
        return convertToResponse(updatedExam, true);
    }

    @Transactional
    public ExamResultResponse takeExam(Long examId, ExamSubmissionRequest submission) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        if (exam.getStatus() != Exam.Status.ACTIVE) {
            throw new RuntimeException("Exam is not active");
        }

        User currentUser = authService.getCurrentUser();
        
        // Check if student already attempted this exam
        if (examAttemptRepository.findByExamAndStudent(exam, currentUser).isPresent()) {
            throw new RuntimeException("You have already attempted this exam");
        }

        ExamAttempt attempt = new ExamAttempt(exam, currentUser);
        int score = 0;

        // Process answers
        for (Map.Entry<Long, String> entry : submission.getAnswers().entrySet()) {
            Long questionId = entry.getKey();
            String selectedAnswer = entry.getValue();

            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            Answer answer = new Answer(attempt, question, selectedAnswer);
            attempt.addAnswer(answer);

            if (answer.getIsCorrect()) {
                score++;
            }
        }

        attempt.setScore(score);
        attempt.setCompletedAt(LocalDateTime.now());
        attempt.setPassed(score >= (exam.getQuestions().size() * 0.6)); // 60% passing grade

        ExamAttempt savedAttempt = examAttemptRepository.save(attempt);

        return new ExamResultResponse(
                savedAttempt.getId(),
                exam.getTitle(),
                score,
                exam.getQuestions().size(),
                savedAttempt.getPercentage(),
                savedAttempt.getPassed(),
                savedAttempt.getCompletedAt()
        );
    }

    public List<ExamResultResponse> getMyExamResults() {
        User currentUser = authService.getCurrentUser();
        List<ExamAttempt> attempts = examAttemptRepository.findByStudentOrderByStartedAtDesc(currentUser);
        
        return attempts.stream()
                .filter(attempt -> attempt.getCompletedAt() != null)
                .map(attempt -> new ExamResultResponse(
                        attempt.getId(),
                        attempt.getExam().getTitle(),
                        attempt.getScore(),
                        attempt.getTotalQuestions(),
                        attempt.getPercentage(),
                        attempt.getPassed(),
                        attempt.getCompletedAt()
                ))
                .collect(Collectors.toList());
    }

    private ExamResponse convertToResponse(Exam exam, boolean includeAnswers) {
        ExamResponse response = new ExamResponse(
                exam.getId(),
                exam.getTitle(),
                exam.getDescription(),
                exam.getStatus().name(),
                exam.getCreatedBy().getUsername(),
                exam.getCreatedAt(),
                exam.getQuestions().size()
        );

        if (includeAnswers) {
            List<QuestionResponse> questions = exam.getQuestions().stream()
                    .map(q -> new QuestionResponse(
                            q.getId(),
                            q.getQuestionText(),
                            q.getOptionA(),
                            q.getOptionB(),
                            q.getOptionC(),
                            q.getOptionD(),
                            q.getCorrectAnswer(),
                            q.getCreatedBy().getUsername(),
                            q.getCreatedAt()
                    ))
                    .collect(Collectors.toList());
            response.setQuestions(questions);
        } else {
            List<QuestionResponse> questions = exam.getQuestions().stream()
                    .map(q -> new QuestionResponse(
                            q.getId(),
                            q.getQuestionText(),
                            q.getOptionA(),
                            q.getOptionB(),
                            q.getOptionC(),
                            q.getOptionD(),
                            null, // Don't show correct answer to students
                            q.getCreatedBy().getUsername(),
                            q.getCreatedAt()
                    ))
                    .collect(Collectors.toList());
            response.setQuestions(questions);
        }

        return response;
    }
}
