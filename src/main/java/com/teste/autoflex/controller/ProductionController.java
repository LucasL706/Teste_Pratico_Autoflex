package com.teste.autoflex.controller;

import com.teste.autoflex.data.dto.ProductionCapacityDTO;
import com.teste.autoflex.service.ProductionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/production")
public class ProductionController {

    @Autowired
    private ProductionServices service;

    @GetMapping(value = "/productionCapacity", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ProductionCapacityDTO> productionCapacity() {return service.calculateProductionCapacity();}

}
