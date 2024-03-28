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
@Table(name = "employee")
public class Employee {
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
    @Column(name = "email", unique = true)
    String email;
    @NonNull
    @Column(name = "password")
    @JsonIgnore
    String password;

    // -----------
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    Set<LectureSeries> lectureSeries;
}
