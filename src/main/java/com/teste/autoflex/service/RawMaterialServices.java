package com.teste.autoflex.service;

import com.teste.autoflex.data.dto.RawMaterialDTO;
import com.teste.autoflex.exception.ResourceNotFoundException;
import com.teste.autoflex.model.RawMaterial;
import com.teste.autoflex.repository.RawMaterialRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.teste.autoflex.mapper.ObjectMapper.parseListObjects;
import static com.teste.autoflex.mapper.ObjectMapper.parseObject;

@Service
public class RawMaterialServices  {

    private Logger logger = LoggerFactory.getLogger(RawMaterialServices.class.getName());

    @Autowired
    RawMaterialRepository repository;


    public List<RawMaterialDTO> findAll(){
        logger.info("Finding all raw materials!");

        return parseListObjects(repository.findAll(), RawMaterialDTO.class);
    }

    public RawMaterialDTO findById(Long id){
        logger.info("Finding one raw material!");

        var entity = repository.findById(id).orElseThrow( () -> new ResourceNotFoundException("No records found for this ID!"));

        return parseObject(entity, RawMaterialDTO.class);
    }

    @Transactional
        public RawMaterialDTO create(RawMaterialDTO rawMaterialDTO) {
            logger.info("Creating one raw material!");

            // The code of a raw material must be UNIQUE
            if (repository.existsByCode(rawMaterialDTO.getCode())) {
                throw new IllegalArgumentException("Raw material code already exists!");
            }

            RawMaterial rawMaterial = parseObject(rawMaterialDTO, RawMaterial.class);

            rawMaterial.setProducts(new ArrayList<>());

            return parseObject(repository.save(rawMaterial), RawMaterialDTO.class);
    }

    @Transactional
    public RawMaterialDTO update(RawMaterialDTO rawMaterialDTO) {
        logger.info("Updating one raw material!");

        RawMaterial entity = repository.findById(rawMaterialDTO.getId()). orElseThrow( () -> new ResourceNotFoundException("No records found for this ID!"));

        // The code of a raw material must be UNIQUE
        if (repository.existsByCodeAndIdNot(rawMaterialDTO.getCode(), entity.getId())) {
            throw new IllegalArgumentException("Raw material code already exists!");
        }

        entity.setCode(rawMaterialDTO.getCode());
        entity.setName(rawMaterialDTO.getName());
        entity.setStockQuantity(rawMaterialDTO.getStockQuantity());

        return parseObject(repository.save(entity), RawMaterialDTO.class);
    }

    public void delete(Long id) {
        logger.info("Deleting one rawMaterial!");
        RawMaterial entity = repository.findById(id). orElseThrow( () -> new ResourceNotFoundException("No records found for this ID!"));
        if(!entity.getProducts().isEmpty()){
            throw new IllegalArgumentException("Cannot delete raw material that is associated with products");
        }
        repository.delete(entity);
    }

}
