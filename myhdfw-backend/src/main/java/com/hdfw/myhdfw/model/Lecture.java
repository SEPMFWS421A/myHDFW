package com.hdfw.myhdfw.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
public class Lecture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @NonNull
    String name;
    @NonNull
    LocalDateTime date;
    @NonNull
    Integer duration;

    @NonNull
    @ManyToOne
    LectureSeries lectureSeries;
    @NonNull
    @ManyToOne
    Room room;

}
