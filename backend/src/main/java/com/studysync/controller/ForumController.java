package com.studysync.controller;

import com.studysync.dto.*;
import com.studysync.service.ForumService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/forum")
public class ForumController {

    @Autowired
    private ForumService forumService;

    @PostMapping("/questions")
    public ResponseEntity<ForumQuestionResponse> postQuestion(@Valid @RequestBody ForumQuestionRequest request) {
        try {
            ForumQuestionResponse response = forumService.postQuestion(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/questions")
    public ResponseEntity<List<ForumQuestionResponse>> getAllQuestions(@RequestParam(defaultValue = "recent") String sortBy) {
        List<ForumQuestionResponse> questions = forumService.getAllQuestions(sortBy);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<ForumQuestionResponse> getQuestion(@PathVariable Long id) {
        try {
            ForumQuestionResponse question = forumService.getQuestionById(id);
            return ResponseEntity.ok(question);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/questions/{id}/answers")
    public ResponseEntity<ForumAnswerResponse> postAnswer(@PathVariable Long id, @Valid @RequestBody ForumAnswerRequest request) {
        try {
            ForumAnswerResponse response = forumService.postAnswer(id, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/questions/tag/{tag}")
    public ResponseEntity<List<ForumQuestionResponse>> getQuestionsByTag(@PathVariable String tag) {
        List<ForumQuestionResponse> questions = forumService.getQuestionsByTag(tag);
        return ResponseEntity.ok(questions);
    }
}
