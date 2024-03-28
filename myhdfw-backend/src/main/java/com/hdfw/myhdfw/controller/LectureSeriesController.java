package com.hdfw.myhdfw.controller;


import com.hdfw.myhdfw.controller.dto.LectureCreationRequest;
import com.hdfw.myhdfw.model.LectureSeries;
import com.hdfw.myhdfw.repository.decorator.LectureSeriesService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/lecture-series")
public class LectureSeriesController {
    private final LectureSeriesService lectureSeriesService;

    public LectureSeriesController(LectureSeriesService lectureSeriesService) {
        this.lectureSeriesService = lectureSeriesService;
    }

    @GetMapping(path = "{lectureSeries_id}")
    @ApiResponse(responseCode = "200", description = "Found Lecture Series",
            content = @Content(schema = @Schema(implementation = LectureSeries.class)))
    public ResponseEntity<LectureSeries> getLecture(@PathVariable("lectureSeries_id") Long lectureSeriesId) {
        if (lectureSeriesId == null) return ResponseEntity.badRequest().build();
        LectureSeries lectureSeries = lectureSeriesService.getLectureSeries(lectureSeriesId);
        if (lectureSeries == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(lectureSeries);
    }

    @GetMapping()
    @ApiResponse(responseCode = "200", description = "Found Lecture Series",
            content = @Content(schema = @Schema(implementation = List.class)))
    public ResponseEntity<List<LectureSeries>> getAllLectures() {
        return ResponseEntity.ok(lectureSeriesService.getAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    @ApiResponse(responseCode = "201", description = "Lecture Series created",
            content = @Content(schema = @Schema(implementation = LectureSeries.class)))
    public ResponseEntity<LectureSeries> createLecture(@RequestBody LectureCreationRequest lectureCreationRequest) {
        if (lectureCreationRequest == null) return ResponseEntity.badRequest().build();
        LectureSeries createdLectureSeries = lectureSeriesService.createLectureSeries(lectureCreationRequest);
        return new ResponseEntity<>(createdLectureSeries, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "{lectureSeries_id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    @ApiResponse(responseCode = "204", description = "Lecture Series deleted")
    public ResponseEntity<Void> deleteLecture(@PathVariable("lectureSeries_id") Long lectureSeriesId) {
        if (lectureSeriesId == null) return ResponseEntity.badRequest().build();
        if (lectureSeriesService.deleteLectureSeries(lectureSeriesId)) return ResponseEntity.noContent().build();
        else return ResponseEntity.notFound().build();
    }
}
