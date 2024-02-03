package com.hdfw.myhdfw.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
public class Student {
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
    @NonNull
    @ManyToOne
    StudentGroup studentGroup;

}
