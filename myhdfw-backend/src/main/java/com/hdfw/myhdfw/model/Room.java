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
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;
    @NonNull
    @Column(name = "name")
    String name;
    @NonNull
    @Column(name = "capacity")
    Integer capacity;
    @NonNull
    @Column(name = "exam_capacity")
    Integer examCapacity;
    @NonNull
    @Column(name = "equipment")
    String equipment;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "location_id")
    Location location;

    // -----------
    @JsonIgnore
    @OneToMany(mappedBy = "room")
    Set<Lecture> lectures;

    @JsonIgnore
    @OneToMany(mappedBy = "room")
    Set<Exam> exams;
}