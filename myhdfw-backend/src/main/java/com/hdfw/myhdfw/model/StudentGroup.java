package com.hdfw.myhdfw.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name = "student_group")
public class StudentGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;
    @NonNull
    @Column(name = "name")
    String name;
    @NonNull
    @ManyToMany
    @JoinTable(
            name = "student_group_lecture_series",
            joinColumns = @JoinColumn(name = "student_group_id"),
            inverseJoinColumns = @JoinColumn(name = "lecture_series_id")
    )
    Set<LectureSeries> lectureSeries;


    // -----------
    @JsonIgnore
    @OneToMany(mappedBy = "studentGroup")
    Set<Student> students;
}
