package com.hdfw.myhdfw.model;

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
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;
    @NonNull
    @Column(name = "name")
    String name;

    // -----------
    @OneToMany(mappedBy = "location")
    Set<Room> rooms;

}
