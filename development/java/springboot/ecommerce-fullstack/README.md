# 🛒 E-Commerce Spring Boot Application

A full-featured e-commerce backend application built with Spring Boot, featuring user management, product catalog, shopping cart, and order processing.

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL database

### Setup
1. **Configure Database**: Update `application.properties` with your database credentials
2. **Build**: `./mvnw clean install`
3. **Run**: `./mvnw spring-boot:run`
4. **Access**: Backend API available at `http://localhost:8080`

## 🎯 Features

- **User Management**: Registration, authentication, profile management
- **Product Management**: CRUD operations for products
- **Shopping Cart**: Add, update, remove items
- **Order Management**: Place orders, view order history
- **Payment Processing**: Payment workflow and tracking
- **Address Management**: User shipping addresses
- **Frontend**: Basic HTML/JS interface in `src/main/resources/static/`

## 📊 Key API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/users/register` - User registration
- `GET /api/products` - Get all products
- `POST /api/cart/add` - Add item to cart
- `POST /api/orders/place` - Place an order
- `POST /api/payments/process` - Process payment

## 🛠️ Technology Stack

- **Framework**: Spring Boot
- **Database**: MySQL
- **ORM**: Spring Data JPA
- **Build Tool**: Maven
- **Frontend**: HTML, CSS, JavaScript

## 📁 Project Structure

```
src/main/java/com/example/e_commerce/
├── ECommerceApplication.java      # Main application class
├── config/                        # Configuration classes
├── controller/                    # REST controllers
├── dto/                          # Data transfer objects
├── Entries/                      # Entity classes
├── repo/                         # Repository interfaces
└── services/                     # Business logic services
```

## 🧪 Testing

Run tests with: `./mvnw test`

---

**Built with ❤️ by phanindra-Dev**