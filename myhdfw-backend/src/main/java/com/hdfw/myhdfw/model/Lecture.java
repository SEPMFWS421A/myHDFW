package com.hdfw.myhdfw.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name = "lecture")
public class Lecture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;
    @NonNull
    @Column(name = "name")
    String name;
    @NonNull
    @Column(name = "date")
    LocalDateTime date;
    @NonNull
    @Column(name = "duration")
    Integer duration;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "lectureSeries_id")
    LectureSeries lectureSeries;
    @NonNull
    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

}
