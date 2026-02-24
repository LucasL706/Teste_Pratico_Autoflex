package com.teste.autoflex.repository;

import com.teste.autoflex.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
