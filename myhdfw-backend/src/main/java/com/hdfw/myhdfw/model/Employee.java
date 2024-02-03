package com.hdfw.myhdfw.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @NonNull
    String name;
    @NonNull
    String surname;
    @NonNull
    String email;
    @NonNull
    String password;

    // -----------
    @OneToMany(mappedBy = "employee")
    Set<LectureSeries> lectureSeries;
}
