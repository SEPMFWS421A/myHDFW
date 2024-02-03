package com.hdfw.myhdfw.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
public class LectureSeries {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @NonNull
    String name;
    @NonNull
    Integer semester;
    @NonNull
    @ManyToOne
    Employee employee;


    // -----------
    @ManyToMany(mappedBy = "lectureSeries")
    Set<StudentGroup> studentGroups;
    @OneToMany(mappedBy = "lectureSeries")
    Set<Lecture> lectures;

}
