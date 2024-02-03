package com.hdfw.myhdfw.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
public class StudentGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @NonNull
    String name;
    @NonNull
    @ManyToMany
    Set<LectureSeries> lectureSeries;


    // -----------
    @OneToMany(mappedBy = "studentGroup")
    Set<Student> students;
}
