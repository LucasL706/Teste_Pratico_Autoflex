package com.teste.autoflex.controller;

import com.teste.autoflex.data.dto.RawMaterialDTO;
import com.teste.autoflex.service.ProductServices;
import com.teste.autoflex.service.RawMaterialServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rawMaterial")
public class RawMaterialController {
    @Autowired
    private RawMaterialServices service;

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public RawMaterialDTO findById(@PathVariable("id") Long id){return service.findById(id);}

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<RawMaterialDTO> findById() {return service.findAll();}

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public RawMaterialDTO create(@RequestBody RawMaterialDTO rawMaterial) {return service.create(rawMaterial);}

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public RawMaterialDTO update(@RequestBody RawMaterialDTO rawMaterial) {return service.update(rawMaterial);}

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
