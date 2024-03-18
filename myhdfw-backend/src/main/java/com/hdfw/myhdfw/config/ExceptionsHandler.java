package com.hdfw.myhdfw.config;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ExceptionsHandler {

    @ExceptionHandler(value = {ExpiredJwtException.class})
    public ResponseEntity<String> handleExpiredJwtException(ExpiredJwtException ex, WebRequest request) {
        return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = {BadCredentialsException.class})
    public ResponseEntity<String> handleBadCredentialsException(Exception ex, WebRequest request) {
        return new ResponseEntity<>("Falsche Anmeldedaten", new HttpHeaders(), HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(value = {HttpMessageNotReadableException.class})
    public ResponseEntity<String> handleHttpMessageNotReadableException(Exception ex, WebRequest request) {
        return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {AccessDeniedException.class})
    public ResponseEntity<String> handleAccessDeniedException(Exception ex, WebRequest request) {
        if (ex.getMessage().equals("Token missing"))
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.UNAUTHORIZED);
        else return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.FORBIDDEN);
    }


    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<String> handleOtherExceptions(Exception ex, WebRequest request) {
        ex.printStackTrace();
        return new ResponseEntity<>("Ein Fehler ist aufgetreten", new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
