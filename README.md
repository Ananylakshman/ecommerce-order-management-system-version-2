# E-Commerce Order Management System

## Overview

A full-stack E-Commerce Order Management System built using React, Spring Boot, MongoDB, JWT Authentication, and Spring Security.

The application allows users to securely log in, view products, place orders, and view order history. Product management APIs support complete CRUD operations.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Token Generation
* Protected APIs using Spring Security

### Product Management

* Add Product
* View All Products
* View Product By ID
* Update Product
* Delete Product

### Order Management

* Create Order
* View Orders
* Order Status Tracking

### Frontend

* React UI
* Product Listing
* Order History
* Navigation
* Logout Functionality

---

## Technology Stack

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT Authentication
* MongoDB
* Gradle

### Frontend

* React
* Axios
* Vite

### Database

* MongoDB

### Messaging

* Apache Kafka (Producer Implementation)

---

## Architecture

React Frontend

↓

REST APIs

↓

Spring Boot Backend

↓

JWT Authentication & Spring Security

↓

MongoDB

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Products

POST /products

GET /products

GET /products/{id}

PUT /products/{id}

DELETE /products/{id}

### Orders

POST /orders

GET /orders

---

## Project Highlights

* Implemented JWT-based Authentication and Authorization.
* Developed Product CRUD Operations.
* Implemented Order Management APIs.
* Integrated React Frontend with Spring Boot Backend.
* Used MongoDB for data persistence.
* Added Kafka Producer for event-driven order processing.
* Applied RESTful API design principles.

---

## Future Enhancements

* Role-Based Access Control (Admin/User)
* Kafka Consumer Integration
* Docker Deployment
* Unit and Integration Testing
* Product Search and Filtering
* Cloud Deployment (AWS/Azure)

---

## Author

Ananya L

Information Science Engineering Student

Full Stack Java Developer (Spring Boot + React)
