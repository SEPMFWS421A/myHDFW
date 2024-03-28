package com.hdfw.myhdfw.controller;


import com.hdfw.myhdfw.controller.dto.LectureUpdateRequest;
import com.hdfw.myhdfw.model.Lecture;
import com.hdfw.myhdfw.repository.decorator.LectureService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/lecture")
public class LectureController {
    private final LectureService lectureService;

    public LectureController(LectureService lectureService) {
        this.lectureService = lectureService;
    }

    @GetMapping(path = "{lecture_id}")
    @ApiResponse(responseCode = "200", description = "Found Lecture",
            content = @Content(schema = @Schema(implementation = Lecture.class)))
    public ResponseEntity<Lecture> getLecture(@PathVariable("lecture_id") Long lectureId) {
        if (lectureId == null) return ResponseEntity.badRequest().build();
        Lecture lecture = lectureService.getLecture(lectureId);
        if (lecture == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(lecture);
    }

    @GetMapping()
    @ApiResponse(responseCode = "200", description = "Found Lectures",
            content = @Content(schema = @Schema(implementation = List.class)))
    public ResponseEntity<List<Lecture>> getAllLectures() {
        return ResponseEntity.ok(lectureService.getAll());
    }

    @PutMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    @ApiResponse(responseCode = "201", description = "Lecture updated",
            content = @Content(schema = @Schema(implementation = LectureUpdateRequest.class)))
    public ResponseEntity<Lecture> createLecture(@RequestBody LectureUpdateRequest lecture) {
        if (lecture == null) return ResponseEntity.badRequest().build();
        Lecture createdLecture = lectureService.updateLecture(lecture);
        return new ResponseEntity<>(createdLecture, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "{lecture_id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    @ApiResponse(responseCode = "204", description = "Lecture deleted")
    public ResponseEntity<Void> deleteLecture(@PathVariable("lecture_id") Long lectureId) {
        if (lectureId == null) return ResponseEntity.badRequest().build();
        if (lectureService.deleteLecture(lectureId)) return ResponseEntity.noContent().build();
        else return ResponseEntity.notFound().build();
    }
}
