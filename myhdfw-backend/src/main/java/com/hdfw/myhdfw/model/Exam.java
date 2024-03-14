package com.hdfw.myhdfw.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name = "exam")
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;
    @NonNull
    @Column(name = "date")
    LocalDateTime date;
    @NonNull
    @Column(name = "duration_min")
    Integer durationMin;
    @NonNull
    @Column(name = "exam_type")
    ExamType examType;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    // -----------

    @JsonIgnore
    @OneToOne(mappedBy = "exam")
    LectureSeries lectureSeries;

}
