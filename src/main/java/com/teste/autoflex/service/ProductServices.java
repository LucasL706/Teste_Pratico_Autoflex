package com.teste.autoflex.service;

import com.teste.autoflex.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServices {

    private Logger logger = LoggerFactory.getLogger(ProductServices.class.getName());

    @Autowired
    ProductRepository repository;


}
