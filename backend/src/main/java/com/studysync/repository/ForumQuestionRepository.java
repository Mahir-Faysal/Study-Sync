package com.studysync.repository;

import com.studysync.model.ForumQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumQuestionRepository extends JpaRepository<ForumQuestion, Long> {
    List<ForumQuestion> findAllByOrderByCreatedAtDesc();
    List<ForumQuestion> findByTagOrderByCreatedAtDesc(String tag);
    
    @Query("SELECT fq FROM ForumQuestion fq LEFT JOIN fq.answers a GROUP BY fq ORDER BY MAX(COALESCE(a.createdAt, fq.createdAt)) DESC")
    List<ForumQuestion> findAllOrderByMostRecent();
}
