package com.hdfw.myhdfw.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;
    @NonNull
    @Column(name = "name")
    String name;
    @NonNull
    @Column(name = "surname")
    String surname;
    @NonNull
    @Column(name = "email")
    String email;
    @NonNull
    @Column(name = "password")
    String password;

    @Column(name = "exmatriculation_date")
    LocalDate exmatriculationDate;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "student_group_id")
    StudentGroup studentGroup;

}
