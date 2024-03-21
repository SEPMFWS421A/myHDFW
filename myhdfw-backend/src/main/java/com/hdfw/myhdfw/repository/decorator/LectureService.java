package com.hdfw.myhdfw.repository.decorator;

import com.hdfw.myhdfw.controller.dto.LectureUpdateRequest;
import com.hdfw.myhdfw.model.Lecture;
import com.hdfw.myhdfw.model.Room;
import com.hdfw.myhdfw.repository.LectureRepository;
import com.hdfw.myhdfw.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LectureService {

    LectureRepository lectureRepository;
    RoomRepository roomRepository;

    public LectureService(LectureRepository lectureRepository, RoomRepository roomRepository) {
        this.lectureRepository = lectureRepository;
        this.roomRepository = roomRepository;
    }

    public Lecture getLecture(Long lectureId) {
        if (lectureId == null) return null;
        return this.lectureRepository.findById(lectureId).orElse(null);
    }

    public List<Lecture> getAll() {
        return lectureRepository.findAll();
    }

    public Lecture updateLecture(LectureUpdateRequest lecture) {
        if (lecture == null ||
                lecture.getName() == null || lecture.getName().isEmpty() ||
                lecture.getDate() == null || lecture.getRoomId() == null || lecture.getDurationMin() == null)
            return null;
        Lecture original = this.lectureRepository.findById(lecture.getId()).orElse(null);
        if (original == null) return null;
        original.setName(lecture.getName());
        original.setDate(lecture.getDate());
        original.setDurationMin(lecture.getDurationMin());
        if (!original.getRoom().getId().equals(lecture.getRoomId())) {
            Room r = roomRepository.findById(lecture.getRoomId()).orElse(null);
            if (r == null) return null;
            original.setRoom(r);
        }
        return lectureRepository.save(original);
    }


    public boolean deleteLecture(Long lectureId) {
        if (lectureId == null) return false;
        if (this.lectureRepository.existsById(lectureId)) {
            this.lectureRepository.deleteById(lectureId);
            return true;
        }
        return false;
    }


}
