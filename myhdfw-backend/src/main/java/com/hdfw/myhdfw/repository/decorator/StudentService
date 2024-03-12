package com.hdfw.myhdfw.repository.decorator;

import com.hdfw.myhdfw.model.Student;
import com.hdfw.myhdfw.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    public Student getStudent(Long id){
        if(id == null) return null;
        return this.studentRepository.findById(id).orElse(null);
    }
    public List<Student> getAll(){
        return studentRepository.findAll();
    }
}