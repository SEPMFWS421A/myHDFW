package com.hdfw.myhdfw.controller;


import com.hdfw.myhdfw.model.Room;
import com.hdfw.myhdfw.repository.decorator.RoomService;
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
        if (roomId == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(roomService.getRoom(roomId));
    }

    @GetMapping()
    @ApiResponse(responseCode = "200", description = "Found Rooms",
            content = @Content(schema = @Schema(implementation = List.class)))
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAll());
    }

}
