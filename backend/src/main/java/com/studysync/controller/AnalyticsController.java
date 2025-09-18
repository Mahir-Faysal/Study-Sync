package com.studysync.controller;

import com.studysync.dto.ExamAnalyticsResponse;
import com.studysync.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/analytics")
@PreAuthorize("hasRole('QUESTION_SETTER')")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/exams/{id}")
    public ResponseEntity<ExamAnalyticsResponse> getExamAnalytics(@PathVariable Long id) {
        try {
            ExamAnalyticsResponse analytics = analyticsService.getExamAnalytics(id);
            return ResponseEntity.ok(analytics);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/exams")
    public ResponseEntity<List<ExamAnalyticsResponse>> getMyExamAnalytics() {
        List<ExamAnalyticsResponse> analytics = analyticsService.getMyExamAnalytics();
        return ResponseEntity.ok(analytics);
    }
}
