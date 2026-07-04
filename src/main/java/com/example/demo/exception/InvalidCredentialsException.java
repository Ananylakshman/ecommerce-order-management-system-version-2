package com.example.demo.exception;

/** Thrown on login when the email/password combination is invalid. */
public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
