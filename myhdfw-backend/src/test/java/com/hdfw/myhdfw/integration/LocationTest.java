package com.hdfw.myhdfw.integration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hdfw.myhdfw.TestsUtil;
import com.hdfw.myhdfw.model.Location;
import com.hdfw.myhdfw.repository.LocationRepository;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
@ContextConfiguration
@AutoConfigureMockMvc
@ActiveProfiles("test")
@WithMockUser(username = "student", roles = {"STUDENT"})
public class LocationTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private TestsUtil testsUtil;

    @Autowired
    private LocationRepository locationRepository;

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new JavaTimeModule());
        testsUtil.deleteAll();
    }

    @Test
    public void getLocationTest() throws Exception {
        Location loc = locationRepository.save(new Location("Location 1"));

        mockMvc.perform(get("/location/" + loc.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(result -> {
                    Location locResponse = objectMapper.readValue(result.getResponse().getContentAsString(), Location.class);
                    Assertions.assertEquals(loc.getName(), locResponse.getName());
                    Assertions.assertNotNull(locResponse.getId());
                });
    }

    @Test
    public void getLocationTestNotFound() throws Exception {
        mockMvc.perform(get("/location/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void getAllLocations() throws Exception {
        locationRepository.save(new Location("Location 1"));
        locationRepository.save(new Location("Location 2"));

        mockMvc.perform(get("/location")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(result -> {
                    List<Location> locResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<List<Location>>() {
                    });
                    Assertions.assertEquals(2, locResponse.size());
                });
    }

}
