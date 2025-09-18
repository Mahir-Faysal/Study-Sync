package com.studysync.repository;

import com.studysync.model.Answer;
import com.studysync.model.ExamAttempt;
import com.studysync.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByExamAttempt(ExamAttempt examAttempt);
    
    @Query("SELECT a FROM Answer a WHERE a.question = :question AND a.examAttempt.exam = :exam")
    List<Answer> findByQuestionAndExam(@Param("question") Question question, @Param("exam") com.studysync.model.Exam exam);
    
    @Query("SELECT COUNT(a) FROM Answer a WHERE a.question = :question AND a.examAttempt.exam.id = :examId AND a.isCorrect = true")
    long countCorrectAnswersByQuestionAndExam(@Param("question") Question question, @Param("examId") Long examId);
    
    @Query("SELECT COUNT(a) FROM Answer a WHERE a.question = :question AND a.examAttempt.exam.id = :examId")
    long countTotalAnswersByQuestionAndExam(@Param("question") Question question, @Param("examId") Long examId);
}
