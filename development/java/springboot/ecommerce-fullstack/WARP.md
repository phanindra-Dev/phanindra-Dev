# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Build and Development Commands

### Core Maven Commands
- **Build**: `./mvnw clean install` or `./mvnw clean compile`
- **Run Application**: `./mvnw spring-boot:run`
- **Run Tests**: `./mvnw test`
- **Run Single Test**: `./mvnw test -Dtest=ClassName#methodName`
- **Package**: `./mvnw clean package`

### Development Workflow
- **Clean and Rebuild**: `./mvnw clean compile`
- **Run with Profile**: `./mvnw spring-boot:run -Dspring-boot.run.profiles=dev`
- **Skip Tests**: `./mvnw install -DskipTests`

## Application Architecture

### High-Level Structure
This is a Spring Boot e-commerce application following a traditional layered architecture:

```
Controller Layer (REST endpoints) 
    ↓
Service Layer (Business logic)
    ↓  
Repository Layer (Data access)
    ↓
Database (MySQL)
```

### Key Architecture Patterns
- **Package Structure**: Organized by technical layers (`controller`, `services`, `repo`, `Entries`, `dto`, `config`)
- **Entity Mapping**: Uses JPA with Hibernate for ORM, entities in `Entries` package
- **Data Access**: Spring Data JPA repositories with auto-generated queries
- **REST APIs**: Controllers expose RESTful endpoints with JSON request/response
- **Configuration**: Uses `application.properties` for database and server configuration

### Core Domain Entities
- **User**: User accounts with authentication and balance management
- **Product**: Product catalog with categories, pricing, and inventory
- **Cart/CartItems**: Shopping cart functionality
- **Order/Ordered**: Order processing and history
- **Payment**: Payment processing workflow
- **UserAddress**: User shipping address management

## Database Configuration

### MySQL Setup Required
- Database: `project` (localhost:3306)
- Update credentials in `src/main/resources/application.properties`
- Hibernate DDL mode: `update` (automatically creates/updates schema)
- SQL logging enabled for debugging

### Key Configuration Properties
- Server runs on port 8080
- JPA show-sql enabled for development
- MySQL8Dialect configured for Hibernate

## Testing

### Test Structure
- Main test class: `ECommerceApplicationTests.java`
- Currently minimal test coverage (only context loading test)
- Uses Spring Boot Test framework with JUnit 5

### Running Tests
- All tests: `./mvnw test`
- Integration tests: Tests load full Spring context
- Test database configuration may need separate profile

## API Endpoints Overview

### Key REST Endpoints
- **Health**: `GET /health`
- **Users**: `/users/*` (CRUD operations, login)
- **Products**: `/products/*` (catalog, search by name/category/price)
- **Cart**: `/cart/*` (add/remove items)
- **Orders**: `/orders/*` (place orders, history)
- **Payments**: `/payments/*` (payment processing)

### Authentication Note
Current implementation uses simple email/password matching without JWT or Spring Security.

## Frontend Integration

### Static Resources
- Location: `src/main/resources/static/`
- Basic HTML/JS interface provided
- Served automatically by Spring Boot at application root

## Development Notes

### Important Considerations
- Password stored in plain text in application.properties (should use environment variables)
- No authentication/authorization framework currently implemented
- Entity package named `Entries` (unconventional naming)
- Some inconsistencies in naming conventions across the codebase

### Technology Stack
- **Framework**: Spring Boot 3.5.5
- **Java Version**: 17
- **Database**: MySQL with JPA/Hibernate
- **Build Tool**: Maven
- **Additional**: Lombok for boilerplate reduction