package com.hdfw.myhdfw.repository;

import com.hdfw.myhdfw.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    public Student findById(Long Id);
}
