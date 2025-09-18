package com.studysync.repository;

import com.studysync.model.Exam;
import com.studysync.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByCreatedByOrderByCreatedAtDesc(User createdBy);
    List<Exam> findByStatusOrderByCreatedAtDesc(Exam.Status status);
    List<Exam> findByCreatedByAndStatusOrderByCreatedAtDesc(User createdBy, Exam.Status status);
}
