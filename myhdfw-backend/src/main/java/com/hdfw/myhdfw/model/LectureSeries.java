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
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

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
  @ManyToOne
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
