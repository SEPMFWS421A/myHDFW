package com.hdfw.myhdfw.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hdfw.myhdfw.TestsUtil;
import com.hdfw.myhdfw.config.security.jwt.JwtService;
import com.hdfw.myhdfw.controller.dto.LoginRequest;
import com.hdfw.myhdfw.model.Employee;
import com.hdfw.myhdfw.repository.EmployeeRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
@ContextConfiguration
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthenticationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TestsUtil testsUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new JavaTimeModule());
        testsUtil.deleteAll();
    }

    @Test
    public void successfulLoginWithValidCredentials() throws Exception {
        Employee e = new Employee("Max", "Mustermann", "admin@email.com", passwordEncoder.encode("1234567890"));
        employeeRepository.save(e);

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(TestsUtil.asJsonString(new LoginRequest("admin@email.com", "1234567890"))))
                .andExpect(status().isOk()).andExpect(result -> {
                    String token = result.getResponse().getContentAsString();
                    String username = jwtService.extractUsername(token);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    Assertions.assertTrue(jwtService.validateToken(token, userDetails));
                });
    }

    @Test
    public void unsuccessfulLoginWithInvalidCredentials() throws Exception {
        Employee e = new Employee("Max", "Mustermann", "admin@email.com", passwordEncoder.encode("1234567890"));
        employeeRepository.save(e);

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(TestsUtil.asJsonString(new LoginRequest("admin@email.com", "0987654321"))))
                .andExpect(status().is4xxClientError());

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(TestsUtil.asJsonString(new LoginRequest("user@email.com", "1234567890"))))
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void unsuccessfulLoginWithEmptyCredentials() throws Exception {
        Employee e = new Employee("Max", "Mustermann", "admin@email.com", passwordEncoder.encode("1234567890"));
        employeeRepository.save(e);

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(TestsUtil.asJsonString(new LoginRequest("", ""))))
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void unsuccessfulLoginWithNullCredentials() throws Exception {
        Employee e = new Employee("Max", "Mustermann", "admin@email.com", passwordEncoder.encode("1234567890"));
        employeeRepository.save(e);

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(TestsUtil.asJsonString(new LoginRequest(null, null))))
                .andExpect(status().is4xxClientError());
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(TestsUtil.asJsonString(null)))
                .andExpect(status().is4xxClientError());
    }
}
