package com.hdfw.myhdfw;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hdfw.myhdfw.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void deleteAll() {
        lectureRepository.deleteAll();
        studentRepository.deleteAll();
        studentGroupRepository.deleteAll();
        roomRepository.deleteAll();
        lectureSeriesRepository.deleteAll();
        employeeRepository.deleteAll();
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
