package com.example.demo.controller;

import com.example.demo.dto.OrderRequest;
import com.example.demo.model.Order;
import com.example.demo.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /** Place an order as the currently logged-in user. */
    @PostMapping
    public ResponseEntity<Order> placeOrder(
            @Valid @RequestBody OrderRequest request,
            Authentication authentication) {

        String userEmail = authentication.getName();
        Order order = orderService.placeOrder(request, userEmail);

        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    /** Order history for the currently logged-in user only. */
    @GetMapping("/my")
    public List<Order> getMyOrders(Authentication authentication) {
        return orderService.getOrdersForUser(authentication.getName());
    }

    /** ADMIN only - view every order placed in the system (enforced in SecurityConfig). */
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
}
