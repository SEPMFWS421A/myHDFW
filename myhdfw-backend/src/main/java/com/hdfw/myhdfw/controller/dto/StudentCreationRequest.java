package com.hdfw.myhdfw.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentCreationRequest {
    String name;
    String surname;
    String email;
    String password;
    Long studentGroupId;
}
