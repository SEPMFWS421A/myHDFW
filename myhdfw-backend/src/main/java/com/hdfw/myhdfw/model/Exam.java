package com.hdfw.myhdfw.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

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
    @OneToMany(mappedBy = "exam")
    Set<LectureSeries> lectureSeries;

}
