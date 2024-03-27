package com.hdfw.myhdfw.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

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
    @NonNull
    @OneToOne
    @JoinColumn(name = "exam_id")
    Exam exam;


    // -----------
    @JsonIgnore
    @OneToMany(mappedBy = "lectureSeries")
    Set<Lecture> lectures;
    @JsonIgnore
    @OneToMany(mappedBy = "lectureSeries")
    Set<Enrollment> enrollments;

}
