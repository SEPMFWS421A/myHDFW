package com.hdfw.myhdfw.controller;

import com.hdfw.myhdfw.controller.dto.StudentCreationRequest;
import com.hdfw.myhdfw.model.Student;
import com.hdfw.myhdfw.repository.decorator.StudentService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
        if (studentId == null) return ResponseEntity.badRequest().build();
        Student student = studentService.getStudent(studentId);
        if (student == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(studentService.getStudent(studentId));
    }

    @GetMapping()
    @ApiResponse(responseCode = "200", description = "Found Students",
            content = @Content(schema = @Schema(implementation = List.class)))
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    @ApiResponse(responseCode = "201", description = "Student created",
            content = @Content(schema = @Schema(implementation = Student.class)))
    public ResponseEntity<Student> createStudent(@RequestBody StudentCreationRequest request) {
        if (request == null) return ResponseEntity.badRequest().build();
        Student createdStudent = studentService.createStudent(request);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

}
