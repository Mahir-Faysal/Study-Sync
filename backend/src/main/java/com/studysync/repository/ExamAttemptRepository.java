package com.studysync.repository;

import com.studysync.model.Exam;
import com.studysync.model.ExamAttempt;
import com.studysync.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamAttemptRepository extends JpaRepository<ExamAttempt, Long> {
    List<ExamAttempt> findByStudentOrderByStartedAtDesc(User student);
    List<ExamAttempt> findByExamOrderByStartedAtDesc(Exam exam);
    Optional<ExamAttempt> findByExamAndStudent(Exam exam, User student);
    
    @Query("SELECT COUNT(ea) FROM ExamAttempt ea WHERE ea.exam = :exam")
    long countByExam(@Param("exam") Exam exam);
    
    @Query("SELECT AVG(ea.score) FROM ExamAttempt ea WHERE ea.exam = :exam AND ea.score IS NOT NULL")
    Double findAverageScoreByExam(@Param("exam") Exam exam);
}
