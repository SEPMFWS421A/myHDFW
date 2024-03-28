package com.hdfw.myhdfw.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
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
