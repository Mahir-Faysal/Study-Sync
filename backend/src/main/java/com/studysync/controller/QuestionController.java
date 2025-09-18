package com.studysync.controller;

import com.studysync.dto.QuestionRequest;
import com.studysync.dto.QuestionResponse;
import com.studysync.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/questions")
@PreAuthorize("hasRole('QUESTION_SETTER')")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping
    public ResponseEntity<?> createQuestion(@Valid @RequestBody QuestionRequest request) {
        try {
            System.out.println("=== CREATING QUESTION ===");
            System.out.println("Question Text: " + request.getQuestionText());
            System.out.println("Option A: " + request.getOptionA());
            System.out.println("Option B: " + request.getOptionB());
            System.out.println("Option C: " + request.getOptionC());
            System.out.println("Option D: " + request.getOptionD());
            System.out.println("Correct Answer: " + request.getCorrectAnswer());
            System.out.println("=========================");
            
            QuestionResponse response = questionService.createQuestion(request);
            System.out.println("Question created successfully with ID: " + response.getId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.out.println("Error creating question: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<QuestionResponse>> getMyQuestions() {
        List<QuestionResponse> questions = questionService.getMyQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponse> getQuestion(@PathVariable Long id) {
        try {
            QuestionResponse question = questionService.getQuestionById(id);
            return ResponseEntity.ok(question);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuestionResponse> updateQuestion(@PathVariable Long id, @Valid @RequestBody QuestionRequest request) {
        try {
            QuestionResponse response = questionService.updateQuestion(id, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        try {
            questionService.deleteQuestion(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
