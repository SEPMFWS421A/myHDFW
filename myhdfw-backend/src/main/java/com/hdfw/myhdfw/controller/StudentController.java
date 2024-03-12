package com.hdfw.myhdfw.controller;

import com.hdfw.myhdfw.model.Student;
import com.hdfw.myhdfw.repository.decorator.StudentService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="/student")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @GetMapping(path  = "{student_id}")
    @ApiResponse(responseCode = "200", description = "Found Student", content = @Content(schema = @Schema(implementation = Student.class)))
    public ResponseEntity<Student> getStudent(@PathVariable("student_id") Long studentId) {
        if (studentId == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(studentService.getStudent(studentId));
    }

    @GetMapping()
    @ApiResponse(responseCode = "200", description = "Found Students",
            content = @Content(schema = @Schema(implementation = List.class)))
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAll());
    }

}
