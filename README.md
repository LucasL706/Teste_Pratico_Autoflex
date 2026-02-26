# AutoFlex API

REST API for product and raw material management with business validation and relational integrity.

---

## Overview

AutoFlex is a RESTful API built with **Spring Boot** for managing products and their associated raw materials.

The system enforces strict business rules to ensure:

- Every product must contain at least one raw material  
- Raw material quantity must be greater than zero  
- Product price must be greater than zero  
- Product and Raw Material codes are unique  
- Referential integrity is preserved at database level  

This project follows clean architecture principles and proper service-layer validation.

---

## Tech Stack

- Java 17  
- Spring Boot 3.x  
- Spring Data JPA  
- Hibernate  
- MySQL  
- Maven  
- Dozer Mapper  
- RESTful Architecture
- React
- React Router DOM
- Axios
- JavaScript (ES6+)
- CSS

---

## Domain Model

### Product

| Field | Type | Rules |
|-------|------|-------|
| id | Long | Auto-generated |
| code | String | Unique, Required |
| name | String | Required |
| price | BigDecimal | Must be > 0 |
| rawMaterials | List | Must contain at least one |

---

### RawMaterial

| Field | Type | Rules |
|-------|------|-------|
| id | Long | Auto-generated |
| code | String | Unique, Required |
| name | String | Required |
| stockQuantity | BigDecimal | Required |

---

### ProductRawMaterial (Join Entity)

| Field | Type | Rules |
|-------|------|-------|
| id | Long | Auto-generated |
| product | Product | Many-to-One |
| rawMaterial | RawMaterial | Many-to-One |
| requiredQuantity | BigDecimal | Must be > 0 |

---

## Entity Relationships

Product 1 --- N ProductRawMaterial N --- 1 RawMaterial

- CascadeType.ALL  
- orphanRemoval = true  
- Strong referential integrity  

---

## Business Rules

### Product

- Must contain at least one raw material
- Raw material quantity must be greater than zero
- Price must be greater than zero
- Code must be unique

### Raw Material

- Code must be unique
- Cannot be deleted if associated with products

---

## Project Structure


src/main/java/com/teste/autoflex
│
├── configuration
├── controller
├── data
├── exception
├── mapper
├── model
├── repository
├── service
└── Startup.java

src/front-end
│   App.css
│   App.js
│   App.test.js
│   index.css
│   index.js
│   logo.svg
│   reportWebVitals.js
│   setupTests.js
│
├── components/
│       Navbar.js
│       ProductForm.js
│       ProductionCapacityList.js
│       ProductList.js
│       RawMaterialForm.js
│       RawMaterialList.js
│
└── pages/
        CreateProduct.js
        CreateRawMaterial.js
        Home.js
        ProductPage.js
        RawMaterialPage.js
        UpdateProduct.js
        UpdateRawMaterial.js


---

## Configuration

### application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/autoflex
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

### Running the Application
1 - Clone the repository
git clone https://github.com/your-username/autoflex.git
cd autoflex
2 - Build the project
mvn clean install
3 - Run the application
mvn spring-boot:run


### Validation Strategy

Service-layer validation

Custom exceptions (ResourceNotFoundException)

Database-level unique constraints

Transactional operations with rollback

Referential integrity enforcement

## Future Improvements

Unit Tests (JUnit + Mockito)

Integration Tests

Swagger / OpenAPI Documentation

Spring Security (Authentication & Authorization)

Pagination and filtering

Soft delete strategy

Docker containerization

Architecture Highlights

Layered Architecture
DTO Pattern
Clean Service Validation
Proper JPA Relationship Modeling
Business Rule Enforcement
Transaction Management

Author

Lucas
Backend Developer (Java | Spring Boot)
