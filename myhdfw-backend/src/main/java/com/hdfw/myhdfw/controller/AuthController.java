package com.hdfw.myhdfw.controller;

import com.hdfw.myhdfw.config.security.jwt.JwtService;
import com.hdfw.myhdfw.config.security.user.UserDetailsImpl;
import com.hdfw.myhdfw.config.security.user.UserDetailsServiceImpl;
import com.hdfw.myhdfw.controller.dto.LoginRequest;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "auth")
public class AuthController {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;

    public AuthController(JwtService jwtService, AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("login")
    @ApiResponse(responseCode = "200", description = "Login Successful",
            content = @Content(schema = @Schema(implementation = String.class)))
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().build();
        }
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        authenticationManager.authenticate(token);
        UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsService.loadUserByUsername(request.getUsername());
        String jwt = jwtService.generateToken(userDetails);
        return ResponseEntity.ok(jwt);
    }
}

