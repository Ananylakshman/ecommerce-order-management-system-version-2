package com.example.demo.exception;

/** Thrown when a requested entity (Product, Order, User, ...) cannot be found. */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
