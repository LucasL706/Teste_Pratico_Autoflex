package com.teste.autoflex.service;

import com.teste.autoflex.data.dto.ProductDTO;
import static com.teste.autoflex.mapper.ObjectMapper.parseListObjects;
import static com.teste.autoflex.mapper.ObjectMapper.parseObject;

import com.teste.autoflex.exception.ResourceNotFoundException;
import com.teste.autoflex.model.Product;
import com.teste.autoflex.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServices {

    private Logger logger = LoggerFactory.getLogger(ProductServices.class.getName());

    @Autowired
    ProductRepository repository;

    public List<ProductDTO> findAll(){
        logger.info("Finding all products!");
        
        return parseListObjects(repository.findAll(), ProductDTO.class);
    }
    
    public ProductDTO findById(Long id){
        logger.info("Finding one product!");
        
        var entity = repository.findById(id).orElseThrow( () -> new ResourceNotFoundException("No records found for this ID!"));
        
        return parseObject(entity, ProductDTO.class);
    }

    public ProductDTO create(ProductDTO productDTO) {
        logger.info("Creating one person!");

        var entity = parseObject(productDTO, Product.class);

        return parseObject(repository.save(entity), ProductDTO.class);
    }

    public ProductDTO update(ProductDTO product) {
        logger.info("Updating one person!");

        Product entity = repository.findById(product.getId()). orElseThrow( () -> new ResourceNotFoundException("No records found for this ID!"));

        entity.setCode(product.getCode());
        entity.setName(product.getName());
        entity.setPrice(product.getPrice());

        return parseObject(repository.save(entity), ProductDTO.class);
    }

    public void delete(Long id) {
        logger.info("Deleting one person!");
        Product entity = repository.findById(id). orElseThrow( () -> new ResourceNotFoundException("No records found for this ID!"));
        repository.delete(entity);
    }

}
