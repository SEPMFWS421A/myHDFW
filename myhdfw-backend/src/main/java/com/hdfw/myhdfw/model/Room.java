package com.hdfw.myhdfw.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @NonNull
    String name;
    @NonNull
    Integer capacity;

    // -----------
    @OneToMany(mappedBy = "room")
    Set<Lecture> lectures;
}