package com.studysync.controller;

import com.studysync.dto.*;
import com.studysync.service.ExamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/exams")
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping
    @PreAuthorize("hasRole('QUESTION_SETTER')")
    public ResponseEntity<ExamResponse> createExam(@Valid @RequestBody ExamRequest request) {
        try {
            ExamResponse response = examService.createExam(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('QUESTION_SETTER')")
    public ResponseEntity<List<ExamResponse>> getMyExams() {
        List<ExamResponse> exams = examService.getMyExams();
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/active")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ExamResponse>> getActiveExams() {
        List<ExamResponse> exams = examService.getActiveExams();
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamResponse> getExam(@PathVariable Long id) {
        try {
            ExamResponse exam = examService.getExamById(id);
            return ResponseEntity.ok(exam);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('QUESTION_SETTER')")
    public ResponseEntity<ExamResponse> updateExamStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        try {
            String status = statusMap.get("status");
            ExamResponse response = examService.updateExamStatus(id, status);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/{id}/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ExamResultResponse> submitExam(@PathVariable Long id, @Valid @RequestBody ExamSubmissionRequest submission) {
        try {
            ExamResultResponse result = examService.takeExam(id, submission);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/results")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ExamResultResponse>> getMyResults() {
        List<ExamResultResponse> results = examService.getMyExamResults();
        return ResponseEntity.ok(results);
    }
}
