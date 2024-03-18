package com.hdfw.myhdfw.controller;

import com.hdfw.myhdfw.model.Location;
import com.hdfw.myhdfw.repository.decorator.LocationService;
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
@RequestMapping(path = "/location")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping(path = "{location_id}")
    @ApiResponse(responseCode = "200", description = "Found Location",
            content = @Content(schema = @Schema(implementation = Location.class)))
    public ResponseEntity<Location> getLocation(@PathVariable("location_id") Long location_id) {
        if (location_id == null) return ResponseEntity.badRequest().build();
        Location location = locationService.getLocation(location_id);
        if (location == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(location);
    }

    @GetMapping()
    @ApiResponse(responseCode = "200", description = "Found Locations",
            content = @Content(schema = @Schema(implementation = List.class)))
    public ResponseEntity<List<Location>> getAllLocations() {
        return ResponseEntity.ok(locationService.getAll());
    }
}
