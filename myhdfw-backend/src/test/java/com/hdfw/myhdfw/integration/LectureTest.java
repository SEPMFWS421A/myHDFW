package com.hdfw.myhdfw.integration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hdfw.myhdfw.TestsUtil;
import com.hdfw.myhdfw.controller.dto.LectureUpdateRequest;
import com.hdfw.myhdfw.model.Lecture;
import com.hdfw.myhdfw.model.LectureSeries;
import com.hdfw.myhdfw.model.Room;
import com.hdfw.myhdfw.repository.LectureRepository;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
@ContextConfiguration
@AutoConfigureMockMvc
@ActiveProfiles("test")
@WithMockUser(username = "student", roles = {"STUDENT"})
public class LectureTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private TestsUtil testsUtil;

    @Autowired
    private LectureRepository lectureRepository;
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
    public void getLectureTest() throws Exception {
        testsUtil.createSimpleData();
        Lecture lecture = lectureRepository.findAll().get(0);

        mockMvc.perform(get("/lecture/" + lecture.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(result -> {
                    Lecture lectureResponse = objectMapper.readValue(result.getResponse().getContentAsString(), Lecture.class);
                    Assertions.assertEquals(lecture.getName(), lectureResponse.getName());
                    Assertions.assertNotNull(lectureResponse.getId());
                });
    }

    @Test
    public void getLectureNotFoundTest() throws Exception {
        mockMvc.perform(get("/lecture/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void getAllLectureTest() throws Exception {
        testsUtil.createSimpleData();
        LectureSeries ls = lectureSeriesRepository.findAll().get(0);
        Room r = roomRepository.findAll().get(0);
        lectureRepository.save(new Lecture("Lecture 2", LocalDateTime.of(2024, 1, 2, 1, 1), 1, ls, r));

        mockMvc.perform(get("/lecture")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(result -> {
                    List<Lecture> lectureResponse =
                            objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<List<Lecture>>() {
                            });
                    Assertions.assertEquals(2, lectureResponse.size());
                });
    }

    @Test
    @WithMockUser(username = "employee", roles = {"EMPLOYEE"})
    public void updateLectureTest() throws Exception {
        testsUtil.createSimpleData();
        Lecture lecture = lectureRepository.findAll().get(0);

        LectureUpdateRequest updatedLecture = new LectureUpdateRequest(lecture.getId(), "Updated Lecture", LocalDateTime.of(2024, 1, 2, 1, 1), 1, lecture.getRoom().getId());

        mockMvc.perform(put("/lecture")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedLecture)))
                .andExpect(status().isCreated())
                .andExpect(result -> {
                    Lecture lectureResponse = objectMapper.readValue(result.getResponse().getContentAsString(), Lecture.class);
                    Assertions.assertEquals(updatedLecture.getName(), lectureResponse.getName());
                    Assertions.assertEquals(updatedLecture.getDate(), lectureResponse.getDate());
                    Assertions.assertEquals(updatedLecture.getDurationMin(), lectureResponse.getDurationMin());
                    Assertions.assertEquals(updatedLecture.getId(), lectureResponse.getRoom().getId());
                    Assertions.assertEquals(lecture.getLectureSeries().getId(), lectureResponse.getLectureSeries().getId());
                });
    }

    @Test
    @WithMockUser(username = "employee", roles = {"EMPLOYEE"})
    public void deleteLectureTest() throws Exception {
        testsUtil.createSimpleData();
        Lecture lecture = lectureRepository.findAll().get(0);

        mockMvc.perform(delete("/lecture/" + lecture.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        Assertions.assertFalse(lectureRepository.existsById(lecture.getId()));
    }

    @Test
    @WithMockUser(username = "employee", roles = {"EMPLOYEE"})
    public void deleteLectureNotFoundTest() throws Exception {
        mockMvc.perform(delete("/lecture/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }


}

