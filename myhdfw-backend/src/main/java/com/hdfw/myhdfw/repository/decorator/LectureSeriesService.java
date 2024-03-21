package com.hdfw.myhdfw.repository.decorator;

import com.hdfw.myhdfw.controller.dto.LectureCreationRequest;
import com.hdfw.myhdfw.model.LectureSeries;
import com.hdfw.myhdfw.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LectureSeriesService {

    LectureSeriesRepository lectureSeriesRepository;
    StudentGroupRepository studentGroupRepository;
    EmployeeRepository employeeRepository;
    RoomRepository roomRepository;
    ExamRepository examRepository;
    LectureRepository lectureRepository;
    EnrollmentRepository enrollmentRepository;

    public LectureSeriesService(LectureSeriesRepository lectureSeriesRepository, StudentGroupRepository studentGroupRepository, EmployeeRepository employeeRepository, RoomRepository roomRepository, ExamRepository examRepository, LectureRepository lectureRepository, EnrollmentRepository enrollmentRepository) {
        this.lectureSeriesRepository = lectureSeriesRepository;
        this.studentGroupRepository = studentGroupRepository;
        this.employeeRepository = employeeRepository;
        this.roomRepository = roomRepository;
        this.examRepository = examRepository;
        this.lectureRepository = lectureRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public LectureSeries getLectureSeries(Long lectureId) {
        if (lectureId == null) return null;
        return this.lectureSeriesRepository.findById(lectureId).orElse(null);
    }

    public List<LectureSeries> getAll() {
        return lectureSeriesRepository.findAll();
    }

    @Transactional
    public LectureSeries createLectureSeries(LectureCreationRequest request) {
        return null;
    }

    @Transactional
    public boolean deleteLectureSeries(Long lectureSeriesId) {
        if (lectureSeriesId == null) return false;
        LectureSeries lectureSeries = lectureSeriesRepository.findById(lectureSeriesId).orElse(null);
        if (lectureSeries != null) {
            if (lectureSeries.getLectures().isEmpty() && lectureSeries.getEnrollments().isEmpty()) {
                this.lectureSeriesRepository.deleteById(lectureSeriesId);
                return true;
            } else {
                lectureRepository.deleteAll(lectureSeries.getLectures());
                enrollmentRepository.deleteAll(lectureSeries.getEnrollments());
                examRepository.delete(lectureSeries.getExam());
                this.lectureSeriesRepository.deleteById(lectureSeriesId);
                return true;
            }
        }
        return false;
    }


}
