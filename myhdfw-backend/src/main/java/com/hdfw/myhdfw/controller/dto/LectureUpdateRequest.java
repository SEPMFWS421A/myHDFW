package com.hdfw.myhdfw.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class LectureUpdateRequest {
    private Long id;
    private String name;
    private LocalDateTime date;
    private Integer durationMin;
    private Long roomId;
}
