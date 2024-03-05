package com.hdfw.myhdfw.repository.decorator;

import com.hdfw.myhdfw.model.Room;
import com.hdfw.myhdfw.repository.LocationRepository;
import com.hdfw.myhdfw.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final LocationRepository locationRepository;

    public RoomService(RoomRepository roomRepository, LocationRepository locationRepository) {
        this.roomRepository = roomRepository;
        this.locationRepository = locationRepository;
    }

    public Room getRoom(Long id) {
        return this.roomRepository.findById(id).orElse(null);
    }

    public List<Room> getAll() {
        return roomRepository.findAll();
    }
}
