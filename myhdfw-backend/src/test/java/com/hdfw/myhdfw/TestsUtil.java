package com.hdfw.myhdfw;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hdfw.myhdfw.model.*;
import com.hdfw.myhdfw.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TestsUtil {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private LectureSeriesRepository lectureSeriesRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentGroupRepository studentGroupRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public void deleteAll() {
        enrollmentRepository.deleteAll();
        studentRepository.deleteAll();
        studentGroupRepository.deleteAll();
        lectureRepository.deleteAll();
        lectureSeriesRepository.deleteAll();
        employeeRepository.deleteAll();
        examRepository.deleteAll();
        roomRepository.deleteAll();
        locationRepository.deleteAll();
    }

    public void createSimpleData() {
        Employee e = new Employee("Max", "Mustermann", "test", "test");
        employeeRepository.save(e);
        Location l = new Location("Location 1");
        locationRepository.save(l);
        Room r = new Room("Room 1", 1, 1, "", l);
        roomRepository.save(r);

        Exam ex = new Exam(LocalDateTime.of(2024, 1, 1, 1, 1), 90, ExamType.ORAL, r);
        examRepository.save(ex);
        LectureSeries ls = new LectureSeries("Lecture Series 1", 1, e, ex);
        lectureSeriesRepository.save(ls);
        Lecture lec = new Lecture("Lecture 1", LocalDateTime.of(2024, 1, 1, 1, 1), 1, ls, r);
        lectureRepository.save(lec);

        StudentGroup sg = new StudentGroup("Group 1");
        studentGroupRepository.save(sg);
        Student s = new Student("Maria", "Mustermann", "test2", "test2", sg);
        studentRepository.save(s);
        Enrollment en = new Enrollment(EnrollmentStatus.ENROLLED, s, ls);
        enrollmentRepository.save(en);
    }






    public static String asJsonString(final Object obj) {
        try {
            ObjectMapper om = new ObjectMapper();
            om.registerModule(new JavaTimeModule());
            return om.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
