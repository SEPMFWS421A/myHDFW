package com.hdfw.myhdfw.repository.decorator;

import com.hdfw.myhdfw.controller.dto.StudentCreationRequest;
import com.hdfw.myhdfw.model.Student;
import com.hdfw.myhdfw.model.StudentGroup;
import com.hdfw.myhdfw.repository.StudentGroupRepository;
import com.hdfw.myhdfw.repository.StudentRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final StudentGroupRepository studentGroupRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(StudentRepository studentRepository, StudentGroupRepository studentGroupRepository,
                          PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.studentGroupRepository = studentGroupRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Student getStudent(Long id) {
        if (id == null) return null;
        return this.studentRepository.findById(id).orElse(null);
    }

    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    public Student createStudent(StudentCreationRequest studentRequest) {
        if (studentRequest == null || studentRequest.getStudentGroupId() == null) return null;
        StudentGroup sg = studentGroupRepository.findById(studentRequest.getStudentGroupId()).orElse(null);
        if (sg == null) return null;
        Student student = new Student(studentRequest.getName(), studentRequest.getSurname(), studentRequest.getEmail(), passwordEncoder.encode(studentRequest.getPassword()), sg);
        return studentRepository.save(student);
    }

    public boolean deleteStudent(Long id) {
        if (id == null) return false;
        studentRepository.deleteById(id);
        return true;
    }
}