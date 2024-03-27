package com.hdfw.myhdfw.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name = "enrollment")
public class Enrollment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  Long id;

  @NonNull
  @Column(name = "status")
  EnrollmentStatus status;

  @NonNull
  @Column(name = "grade")
  Float grade;


  @NonNull
  @ManyToOne
  @JoinColumn(name = "student_id")
  Student student;
  @NonNull
  @ManyToOne
  @JoinColumn(name = "lecture_series_id")
  LectureSeries lectureSeries;


}
