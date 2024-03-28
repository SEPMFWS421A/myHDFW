package com.hdfw.myhdfw.repository.decorator;

import com.hdfw.myhdfw.model.Room;
import com.hdfw.myhdfw.repository.LocationRepository;
import com.hdfw.myhdfw.repository.RoomRepository;
import jakarta.transaction.Transactional;
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
        if(id == null) return null;
        return this.roomRepository.findById(id).orElse(null);
    }

    public List<Room> getAll() {
        return roomRepository.findAll();
    }

    public Room createRoom(Room room) {
        if(room==null || room.getLocation() == null) return null;
        return roomRepository.save(room);
    }

    @Transactional
    public boolean deleteRoom(Long id) {
        if(id == null) return false;
        Room room = roomRepository.findById(id).orElse(null);
        if (room!=null) {
            if (room.getLectures().isEmpty() && room.getExams().isEmpty()) {
                roomRepository.deleteById(id);
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}
