package com.hdfw.myhdfw.controller;


import com.hdfw.myhdfw.model.Room;
import com.hdfw.myhdfw.repository.decorator.RoomService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/room")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }


    @GetMapping(path = "{room_id}")
    @ApiResponse(responseCode = "200", description = "Found Room",
            content = @Content(schema = @Schema(implementation = Room.class)))
    public ResponseEntity<Room> getRoom(@PathVariable("room_id") Long roomId) {
        if (roomId == null) return ResponseEntity.badRequest().build();
        Room room = roomService.getRoom(roomId);
        if(room == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(room);
    }

    @GetMapping()
    @ApiResponse(responseCode = "200", description = "Found Rooms",
            content = @Content(schema = @Schema(implementation = List.class)))
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    @ApiResponse(responseCode = "201", description = "Room created",
            content = @Content(schema = @Schema(implementation = Room.class)))
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        if (room == null) return ResponseEntity.badRequest().build();
        Room createdRoom = roomService.createRoom(room);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "{room_id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    @ApiResponse(responseCode = "204", description = "Room deleted")
    public ResponseEntity<Void> deleteRoom(@PathVariable("room_id") Long roomId) {
        if (roomId == null) return ResponseEntity.badRequest().build();
        if(roomService.deleteRoom(roomId))return ResponseEntity.noContent().build();
        else return ResponseEntity.notFound().build();
    }

}
