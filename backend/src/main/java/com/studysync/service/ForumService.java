package com.studysync.service;

import com.studysync.dto.*;
import com.studysync.model.ForumAnswer;
import com.studysync.model.ForumQuestion;
import com.studysync.model.User;
import com.studysync.repository.ForumAnswerRepository;
import com.studysync.repository.ForumQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ForumService {

    @Autowired
    private ForumQuestionRepository forumQuestionRepository;

    @Autowired
    private ForumAnswerRepository forumAnswerRepository;

    @Autowired
    private AuthService authService;

    public ForumQuestionResponse postQuestion(ForumQuestionRequest request) {
        User currentUser = authService.getCurrentUser();
        
        ForumQuestion question = new ForumQuestion(
                request.getTitle(),
                request.getDescription(),
                request.getTag(),
                currentUser
        );

        ForumQuestion savedQuestion = forumQuestionRepository.save(question);
        return convertQuestionToResponse(savedQuestion, false);
    }

    public List<ForumQuestionResponse> getAllQuestions(String sortBy) {
        List<ForumQuestion> questions;
        
        if ("recent".equals(sortBy)) {
            questions = forumQuestionRepository.findAllByOrderByCreatedAtDesc();
        } else {
            questions = forumQuestionRepository.findAllOrderByMostRecent();
        }

        return questions.stream()
                .map(q -> convertQuestionToResponse(q, false))
                .collect(Collectors.toList());
    }

    public ForumQuestionResponse getQuestionById(Long id) {
        ForumQuestion question = forumQuestionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Forum question not found"));
        
        return convertQuestionToResponse(question, true);
    }

    public ForumAnswerResponse postAnswer(Long questionId, ForumAnswerRequest request) {
        ForumQuestion question = forumQuestionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Forum question not found"));

        User currentUser = authService.getCurrentUser();
        
        ForumAnswer answer = new ForumAnswer(request.getContent(), question, currentUser);
        ForumAnswer savedAnswer = forumAnswerRepository.save(answer);

        return convertAnswerToResponse(savedAnswer);
    }

    public List<ForumQuestionResponse> getQuestionsByTag(String tag) {
        List<ForumQuestion> questions = forumQuestionRepository.findByTagOrderByCreatedAtDesc(tag);
        return questions.stream()
                .map(q -> convertQuestionToResponse(q, false))
                .collect(Collectors.toList());
    }

    private ForumQuestionResponse convertQuestionToResponse(ForumQuestion question, boolean includeAnswers) {
        ForumQuestionResponse response = new ForumQuestionResponse(
                question.getId(),
                question.getTitle(),
                question.getDescription(),
                question.getTag(),
                question.getPostedBy().getUsername(),
                question.getCreatedAt(),
                question.getAnswers().size()
        );

        if (includeAnswers) {
            List<ForumAnswerResponse> answers = question.getAnswers().stream()
                    .map(this::convertAnswerToResponse)
                    .collect(Collectors.toList());
            response.setAnswers(answers);
        }

        return response;
    }

    private ForumAnswerResponse convertAnswerToResponse(ForumAnswer answer) {
        return new ForumAnswerResponse(
                answer.getId(),
                answer.getContent(),
                answer.getAnsweredBy().getUsername(),
                answer.getCreatedAt()
        );
    }
}
