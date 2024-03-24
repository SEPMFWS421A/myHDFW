package com.hdfw.myhdfw;

import com.hdfw.myhdfw.model.*;
import com.hdfw.myhdfw.repository.*;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
public class Demo {

    PasswordEncoder passwordEncoder;
    private final StudentRepository studentRepository;
    private final EmployeeRepository employeeRepository;
    private final RoomRepository roomRepository;
    private final LectureRepository lectureRepository;
    private final LectureSeriesRepository lectureSeriesRepository;
    private final StudentGroupRepository studentGroupRepository;

    public Demo(PasswordEncoder passwordEncoder, StudentRepository studentRepository, EmployeeRepository employeeRepository, RoomRepository roomRepository, LectureRepository lectureRepository, LectureSeriesRepository lectureSeriesRepository, StudentGroupRepository studentGroupRepository) {
        this.passwordEncoder = passwordEncoder;
        this.studentRepository = studentRepository;
        this.employeeRepository = employeeRepository;
        this.roomRepository = roomRepository;
        this.lectureRepository = lectureRepository;
        this.lectureSeriesRepository = lectureSeriesRepository;
        this.studentGroupRepository = studentGroupRepository;
    }

    //@EventListener(ApplicationStartedEvent.class)
    public void demo() {

        Employee e = new Employee("Max", "Mustermann", "admin", passwordEncoder.encode("admin"));
        employeeRepository.save(e);

        Location loc = new Location("Mettmann");
        Room r = new Room("Room 1", 25, loc);
        roomRepository.save(r);

        LectureSeries ls = new LectureSeries("Lecture Series 1", 1, e);
        lectureSeriesRepository.save(ls);
        Lecture l = new Lecture("Lecture 1", LocalDateTime.of(2024, 1, 1, 1, 1), 1, ls, r);
        lectureRepository.save(l);

        StudentGroup sg = new StudentGroup("Group 1", Set.of(ls));
        studentGroupRepository.save(sg);
        Student s = new Student("Max", "Mustermann", "email@email.de", passwordEncoder.encode("admin"), sg);
        studentRepository.save(s);
    }
}
