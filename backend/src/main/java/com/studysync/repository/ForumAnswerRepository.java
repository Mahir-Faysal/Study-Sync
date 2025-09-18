package com.studysync.repository;

import com.studysync.model.ForumAnswer;
import com.studysync.model.ForumQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumAnswerRepository extends JpaRepository<ForumAnswer, Long> {
    List<ForumAnswer> findByForumQuestionOrderByCreatedAtAsc(ForumQuestion forumQuestion);
}
