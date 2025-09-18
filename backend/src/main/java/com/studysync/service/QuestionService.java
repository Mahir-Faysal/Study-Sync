package com.studysync.service;

import com.studysync.dto.QuestionRequest;
import com.studysync.dto.QuestionResponse;
import com.studysync.model.Question;
import com.studysync.model.User;
import com.studysync.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AuthService authService;

    public QuestionResponse createQuestion(QuestionRequest request) {
        System.out.println("QuestionService: Getting current user...");
        User currentUser = authService.getCurrentUser();
        System.out.println("QuestionService: Current user: " + currentUser.getUsername() + ", Role: " + currentUser.getRole());
        
        if (currentUser.getRole() != User.Role.QUESTION_SETTER) {
            throw new RuntimeException("Only question setters can create questions. Current role: " + currentUser.getRole());
        }

        System.out.println("QuestionService: Creating question object...");
        Question question = new Question(
                request.getQuestionText(),
                request.getOptionA(),
                request.getOptionB(),
                request.getOptionC(),
                request.getOptionD(),
                request.getCorrectAnswer(),
                currentUser
        );

        System.out.println("QuestionService: Saving question to database...");
        Question savedQuestion = questionRepository.save(question);
        System.out.println("QuestionService: Question saved with ID: " + savedQuestion.getId());
        
        return convertToResponse(savedQuestion, true);
    }

    public List<QuestionResponse> getMyQuestions() {
        User currentUser = authService.getCurrentUser();
        List<Question> questions = questionRepository.findByCreatedByOrderByCreatedAtDesc(currentUser);
        return questions.stream()
                .map(q -> convertToResponse(q, true))
                .collect(Collectors.toList());
    }

    public QuestionResponse getQuestionById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        User currentUser = authService.getCurrentUser();
        boolean showCorrectAnswer = currentUser.getRole() == User.Role.QUESTION_SETTER;
        
        return convertToResponse(question, showCorrectAnswer);
    }

    public QuestionResponse updateQuestion(Long id, QuestionRequest request) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        User currentUser = authService.getCurrentUser();
        if (!question.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can only update your own questions");
        }

        question.setQuestionText(request.getQuestionText());
        question.setOptionA(request.getOptionA());
        question.setOptionB(request.getOptionB());
        question.setOptionC(request.getOptionC());
        question.setOptionD(request.getOptionD());
        question.setCorrectAnswer(request.getCorrectAnswer());

        Question updatedQuestion = questionRepository.save(question);
        return convertToResponse(updatedQuestion, true);
    }

    public void deleteQuestion(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        User currentUser = authService.getCurrentUser();
        if (!question.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can only delete your own questions");
        }

        questionRepository.delete(question);
    }

    private QuestionResponse convertToResponse(Question question, boolean showCorrectAnswer) {
        QuestionResponse response = new QuestionResponse(
                question.getId(),
                question.getQuestionText(),
                question.getOptionA(),
                question.getOptionB(),
                question.getOptionC(),
                question.getOptionD(),
                showCorrectAnswer ? question.getCorrectAnswer() : null,
                question.getCreatedBy().getUsername(),
                question.getCreatedAt()
        );
        return response;
    }
}
