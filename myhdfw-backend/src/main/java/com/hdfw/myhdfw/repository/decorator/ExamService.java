package com.hdfw.myhdfw.repository.decorator;

import com.hdfw.myhdfw.model.Exam;
import com.hdfw.myhdfw.repository.ExamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {
    ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    public Exam getExam(Long examId) {
        if (examId == null) return null;
        return this.examRepository.findById(examId).orElse(null);
    }

    public List<Exam> getAll() {
        return examRepository.findAll();
    }
}
