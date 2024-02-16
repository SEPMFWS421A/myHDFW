package com.hdfw.myhdfw.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name = "lecture_series")
public class LectureSeries {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;
    @NonNull
    @Column(name = "name")
    String name;
    @NonNull
    @Column(name = "semester")
    Integer semester;
    @NonNull
    @ManyToOne
    @JoinColumn(name = "employee_id")
    Employee employee;


    // -----------
    @JsonIgnore
    @ManyToMany(mappedBy = "lectureSeries")
    Set<StudentGroup> studentGroups;
    @JsonIgnore
    @OneToMany(mappedBy = "lectureSeries")
    Set<Lecture> lectures;

}
