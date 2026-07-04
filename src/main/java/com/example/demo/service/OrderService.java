package com.example.demo.service;

import com.example.demo.dto.OrderRequest;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Order;
import com.example.demo.model.Product;
import com.example.demo.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;

    public OrderService(OrderRepository orderRepository, ProductService productService) {
        this.orderRepository = orderRepository;
        this.productService = productService;
    }

    /**
     * Places an order for the given authenticated user's email.
     * The email always comes from the server-side security context,
     * never from the request body, so a user can never order on someone else's behalf.
     */
    public Order placeOrder(OrderRequest request, String userEmail) {

        Product product = productService.getProductById(request.getProductId());

        if (product.getStock() < request.getQuantity()) {
            throw new IllegalArgumentException("Not enough stock available for " + product.getName());
        }

        Order order = new Order();
        order.setProductId(product.getId());
        order.setProductName(product.getName());
        order.setQuantity(request.getQuantity());
        order.setUserEmail(userEmail);
        order.setStatus("PLACED");

        Order savedOrder = orderRepository.save(order);

        product.setStock(product.getStock() - request.getQuantity());
        productService.updateProduct(product.getId(), product);

        return savedOrder;
    }

    public List<Order> getOrdersForUser(String userEmail) {
        return orderRepository.findByUserEmailOrderByIdDesc(userEmail);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }
}
