package com.hdfw.myhdfw.integration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hdfw.myhdfw.TestsUtil;
import com.hdfw.myhdfw.model.*;
import com.hdfw.myhdfw.repository.ExamRepository;
import com.hdfw.myhdfw.repository.LectureSeriesRepository;
import com.hdfw.myhdfw.repository.RoomRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
@ContextConfiguration
@AutoConfigureMockMvc
@ActiveProfiles("test")
@WithMockUser(username = "student", roles = {"STUDENT"})
public class LectureSeriesTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private TestsUtil testsUtil;

    @Autowired
    private ExamRepository examRepository;
    @Autowired
    private LectureSeriesRepository lectureSeriesRepository;
    @Autowired
    private RoomRepository roomRepository;

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new JavaTimeModule());
        testsUtil.deleteAll();
    }

    @Test
    public void getLectureSeriesTest() throws Exception {
        testsUtil.createSimpleData();
        LectureSeries lectureSeries = lectureSeriesRepository.findAll().get(0);

        mockMvc.perform(get("/lecture-series/" + lectureSeries.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(result -> {
                    LectureSeries lectureSeriesResponse = objectMapper.readValue(result.getResponse().getContentAsString(), LectureSeries.class);
                    Assertions.assertEquals(lectureSeries.getName(), lectureSeriesResponse.getName());
                    Assertions.assertNotNull(lectureSeriesResponse.getId());
                });
    }

    @Test
    public void getLectureSeriesNotFoundTest() throws Exception {
        mockMvc.perform(get("/lecture-series/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void getAllLectureSeriesTest() throws Exception {
        testsUtil.createSimpleData();
        Employee employee = lectureSeriesRepository.findAll().get(0).getEmployee();
        Room room = roomRepository.findAll().get(0);
        Exam ex = new Exam(LocalDateTime.of(2026, 1, 1, 1, 1), 90, ExamType.WRITTEN, room);
        examRepository.save(ex);
        LectureSeries ls = new LectureSeries("Lecture Series 2", 2, employee, ex);
        lectureSeriesRepository.save(ls);

        mockMvc.perform(get("/lecture-series")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(result -> {
                    List<LectureSeries> lectureSeriesResponse =
                            objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<List<LectureSeries>>() {
                            });
                    Assertions.assertEquals(2, lectureSeriesResponse.size());
                });
    }

    @Test
    @WithMockUser(username = "employee", roles = {"EMPLOYEE"})
    public void createLectureSeriesTest() throws Exception {

    }

    @Test
    @WithMockUser(username = "employee", roles = {"EMPLOYEE"})
    public void deleteLectureSeriesTest() throws Exception {
        testsUtil.createSimpleData();
        LectureSeries lectureSeries = lectureSeriesRepository.findAll().get(0);

        mockMvc.perform(delete("/lecture-series/" + lectureSeries.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        Assertions.assertFalse(lectureSeriesRepository.existsById(lectureSeries.getId()));
    }

    @Test
    @WithMockUser(username = "employee", roles = {"EMPLOYEE"})
    public void deleteLectureSeriesNotFoundTest() throws Exception {
        mockMvc.perform(delete("/lecture-series/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }


}

