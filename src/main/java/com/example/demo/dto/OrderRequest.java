package com.example.demo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

/**
 * Incoming payload for placing an order.
 * Note: userEmail is intentionally NOT part of this DTO - the authenticated
 * user's email is always taken from the JWT/SecurityContext on the server
 * side, so a client can never place an order on behalf of someone else.
 */
public class OrderRequest {

    @NotBlank(message = "Product id is required")
    private String productId;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
