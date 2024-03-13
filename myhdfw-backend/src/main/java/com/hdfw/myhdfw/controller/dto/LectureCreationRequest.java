package com.hdfw.myhdfw.controller.dto;

import com.hdfw.myhdfw.model.Employee;
import java.time.LocalDateTime;

public class LectureCreationRequest {
  private String name;
  private Long studentGroupId;
  private Employee lecturer;
  private int semester;
  private LocalDateTime lectureStart;
  private int lectureDurationMin;
  private Long lectureRoomId;
  private LocalDateTime examDate;
  private int examDurationMin;
  private Long examRoomId;
  private Long examType;
}
