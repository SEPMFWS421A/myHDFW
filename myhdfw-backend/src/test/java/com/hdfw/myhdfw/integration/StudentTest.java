package com.hdfw.myhdfw.integration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hdfw.myhdfw.TestsUtil;
import com.hdfw.myhdfw.model.Student;
import com.hdfw.myhdfw.repository.StudentRepository;
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

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
@ContextConfiguration
@AutoConfigureMockMvc
@ActiveProfiles("test")
@WithMockUser(username = "admin", roles = {"ADMIN"})
public class StudentTest {
    @Autowire
    private MockMvc mockMvc;
    @Autowire
    private ObjectMapper objectMapper;
    @Autowire
    private TestsUtil testsUtil;
    @Autowire
    private StudentRepository studentRepository;
    @BeforeEach
    public void init(){
        objectMapper.registerModule(new JavaTimeModule());
        testsUtil.deleteAll();
    }

    @Test
    public void getStudentTest() throws Exception {
        Student student = studentRepository.save(new Student("Max", "Mustermann", "max-mustermann@hdfw.de", "test1234"));

        mockMvc.perform(get("/student/" + student.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk())
                .andExpect(result -> {
                    Room roomResponse = objectMapper.readValue(result.getResponse().getContentAsString(), Room.class);
                    Assertions.assertEquals(room.getName(), roomResponse.getName());
                    Assertions.assertNotNull(roomResponse.getId());
                });
    }
    @Test
    public void getStudentNotFoundTest() throws Exception {
        mockMvc.perform(get("/student/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void getAllStudentsTest() throws Exception {
        Student student1 = studentRepository.save(new Student("Student 1", "Surname 1", "Student1@fhdw.de","Student1pass"));
        Room room2 = roomRepository.save(new Student("Student 2", "Surname 2", "Student2@fhdw.de","Student2pass"));

        mockMvc.perform(get("/student")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(result -> {
                    List<Student> studentResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<List<Student>>() {
                    });
                    Assertions.assertEquals(2, studentResponse.size());
                });
    }

    @Test
    public void saveStudentTest() throws Exception {
        Student student = new Student("Student 1", "Surname 1", "Student1@fhdw.de","Student1pass");

        mockMvc.perform(post("/student")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(result -> {
                    Student studentResponse = objectMapper.readValue(result.getResponse().getContentAsString(), Student.class);
                    Assertions.assertEquals(student.getName(), studentResponse.getName());
                    Assertions.assertNotNull(studentResponse.getId());
                });
    }

    @Test
    public void deleteStudentTest() throws Exception {
        Student student = studentRepository.save(new Student("Student 1", "Surname 1", "Student1@fhdw.de","Student1pass"));

        mockMvc.perform(delete("/student/" + student.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        Assertions.assertFalse(studentRepository.existsById(student.getId()));
    }

    @Test
    public void deleteRoomNotFoundTest() throws Exception {
        mockMvc.perform(delete("/student/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

}