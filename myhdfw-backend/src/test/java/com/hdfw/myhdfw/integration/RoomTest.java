package com.hdfw.myhdfw.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hdfw.myhdfw.TestsUtil;
import com.hdfw.myhdfw.model.Location;
import com.hdfw.myhdfw.model.Room;
import com.hdfw.myhdfw.repository.LocationRepository;
import com.hdfw.myhdfw.repository.RoomRepository;
import java.util.List;
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

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
@ContextConfiguration
@AutoConfigureMockMvc
@ActiveProfiles("test")
@WithMockUser(username = "admin", roles = {"EMPLOYEE"})
public class RoomTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private TestsUtil testsUtil;

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private LocationRepository locationRepository;

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new JavaTimeModule());
        testsUtil.deleteAll();
    }

    @Test
    public void getRoomTest() throws Exception {
        Location l = locationRepository.save(new Location("Location 1"));
      Room room = roomRepository.save(new Room("Room 1", 1, 1, "", l));

        mockMvc.perform(get("/room/" + room.getId())
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
    public void getRoomNotFoundTest() throws Exception {
        mockMvc.perform(get("/room/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void getAllRoomsTest() throws Exception {
      Location l = locationRepository.save(new Location("Location 1"));
      Room room1 = roomRepository.save(new Room("Room 1", 1, 1, "", l));
      Room room2 = roomRepository.save(new Room("Room 2", 1, 1, "", l));

      mockMvc.perform(get("/room")
              .contentType(MediaType.APPLICATION_JSON)
              .accept(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk())
          .andExpect(result -> {
            List<Room> roomResponse =
                objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<List<Room>>() {
                });
            Assertions.assertEquals(2, roomResponse.size());
          });
    }

    @Test
    public void saveRoomTest() throws Exception {
      Location l = locationRepository.save(new Location("Location 1"));
      Room room = new Room("Room 1", 1, 1, "", l);

        mockMvc.perform(post("/room")
                        .content(objectMapper.writeValueAsString(room))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(result -> {
                    Room roomResponse = objectMapper.readValue(result.getResponse().getContentAsString(), Room.class);
                    Assertions.assertEquals(room.getName(), roomResponse.getName());
                    Assertions.assertNotNull(roomResponse.getId());
                    Assertions.assertTrue(roomRepository.existsById(roomResponse.getId()));
                });

    }

    @Test
    public void deleteRoomTest() throws Exception {
      Location l = locationRepository.save(new Location("Location 1"));
      Room room = roomRepository.save(new Room("Room 1", 1, 1, "", l));

        mockMvc.perform(delete("/room/" + room.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        Assertions.assertFalse(roomRepository.existsById(room.getId()));
    }

    @Test
    public void deleteRoomNotFoundTest() throws Exception {
        mockMvc.perform(delete("/room/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

}
