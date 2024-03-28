package com.hdfw.myhdfw.controller.dto;

import com.hdfw.myhdfw.model.ExamType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class LectureCreationRequest {
  private String name;
  private Long studentGroupId;
    private Long lecturerId;
  private int semester;
  private LocalDateTime lectureStart;
  private int lectureDurationMin;
  private Long lectureRoomId;
  private LocalDateTime examDate;
  private int examDurationMin;
  private Long examRoomId;
    private ExamType examType;
}
