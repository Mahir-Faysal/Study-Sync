package com.studysync.repository;

import com.studysync.model.Question;
import com.studysync.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByCreatedByOrderByCreatedAtDesc(User createdBy);
    List<Question> findByCreatedBy(User createdBy);
}
