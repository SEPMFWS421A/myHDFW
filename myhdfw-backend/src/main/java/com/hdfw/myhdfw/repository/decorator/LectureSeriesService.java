package com.hdfw.myhdfw.repository.decorator;

import com.hdfw.myhdfw.controller.dto.LectureCreationRequest;
import com.hdfw.myhdfw.model.*;
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
        if (request == null ||
                request.getName() == null || request.getName().isEmpty() ||
                request.getLecturerId() == null || request.getExamRoomId() == null || request.getLectureRoomId() == null || request.getStudentGroupId() == null ||
                request.getLectureStart() == null || request.getExamDate() == null ||
                request.getSemester() == 0 || request.getExamDurationMin() == 0 || request.getLectureDurationMin() == 0 ||
                request.getExamType() == null) return null;
        StudentGroup s = studentGroupRepository.findById(request.getStudentGroupId()).orElse(null);
        if (s == null) return null;
        Employee e = employeeRepository.findById(request.getLecturerId()).orElse(null);
        if (e == null) return null;
        Room examRoom = roomRepository.findById(request.getExamRoomId()).orElse(null);
        if (examRoom == null) return null;
        Room lectureRoom = roomRepository.findById(request.getLectureRoomId()).orElse(null);
        if (lectureRoom == null) return null;

        Exam exam = new Exam();
        exam.setDate(request.getExamDate());
        exam.setDurationMin(request.getExamDurationMin());
        exam.setRoom(examRoom);
        exam.setExamType(request.getExamType());
        examRepository.save(exam);

        LectureSeries lectureSeries = new LectureSeries();
        lectureSeries.setName(request.getName());
        lectureSeries.setSemester(request.getSemester());
        lectureSeries.setEmployee(e);
        lectureSeries.setExam(exam);
        lectureSeriesRepository.save(lectureSeries);

        for (int i = 0; i < 10; i++) {
            Lecture lecture = new Lecture();
            lecture.setName(request.getName() + " (" + (i + 1) + ". Vorlesung)");
            lecture.setLectureSeries(lectureSeries);
            lecture.setRoom(lectureRoom);
            lecture.setDate(request.getLectureStart().plusWeeks(i));
            lecture.setDurationMin(request.getLectureDurationMin());
            lectureRepository.save(lecture);
        }

        for (Student student : s.getStudents()) {
            Enrollment enrollment = new Enrollment();
            enrollment.setStudent(student);
            enrollment.setLectureSeries(lectureSeries);
            enrollment.setStatus(EnrollmentStatus.ENROLLED);
            enrollmentRepository.save(enrollment);
        }
        return lectureSeries;
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
