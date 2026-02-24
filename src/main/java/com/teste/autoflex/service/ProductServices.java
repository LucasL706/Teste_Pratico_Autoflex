package com.teste.autoflex.service;

import com.teste.autoflex.data.dto.ProductDTO;
import static com.teste.autoflex.mapper.ObjectMapper.parseListObjects;
import static com.teste.autoflex.mapper.ObjectMapper.parseObject;

import com.teste.autoflex.data.dto.ProductRawMaterialDTO;
import com.teste.autoflex.exception.ResourceNotFoundException;
import com.teste.autoflex.model.Product;
import com.teste.autoflex.model.ProductRawMaterial;
import com.teste.autoflex.model.RawMaterial;
import com.teste.autoflex.repository.ProductRepository;
import com.teste.autoflex.repository.RawMaterialRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServices {

    private Logger logger = LoggerFactory.getLogger(ProductServices.class.getName());

    @Autowired
    ProductRepository repository;
    @Autowired
    RawMaterialRepository rawMaterialrepository;

    public List<ProductDTO> findAll(){
        logger.info("Finding all products!");
        
        return parseListObjects(repository.findAll(), ProductDTO.class);
    }
    
    public ProductDTO findById(Long id){
        logger.info("Finding one product!");
        
        var entity = repository.findById(id).orElseThrow( () -> new ResourceNotFoundException("No records found for this ID!"));
        
        return parseObject(entity, ProductDTO.class);
    }

    @Transactional
    public ProductDTO create(ProductDTO productDTO) {
        logger.info("Creating one product!");

        Product product = parseObject(productDTO, Product.class);

        // The code of a product must be UNIQUE
        if (repository.existsByCode(productDTO.getCode())) {
            throw new IllegalArgumentException("Product code already exists!");
        }

        product.setRawMaterialList(new ArrayList<>());

        rawMaterialValidation(product, productDTO.getRawMaterials());

        priceValidation(productDTO.getPrice());

        return parseObject(repository.save(product), ProductDTO.class);
    }

    @Transactional
    public ProductDTO update(ProductDTO productDTO) {
        logger.info("Updating one product!");

        Product entity = repository.findById(productDTO.getId()). orElseThrow( () -> new ResourceNotFoundException("No records found for this ID!"));

        // The code of a product must be UNIQUE
        if (repository.existsByCodeAndIdNot(productDTO.getCode(), entity.getId())) {
            throw new IllegalArgumentException("Product code already exists!");
        }

        entity.getRawMaterialList().clear(); // Resets the raw materials list to delete old raw materials.

        rawMaterialValidation(entity, productDTO.getRawMaterials());
        associateRawMaterialsToProduct(entity, productDTO.getRawMaterials());

        priceValidation(productDTO.getPrice());

        entity.setCode(productDTO.getCode());
        entity.setName(productDTO.getName());
        entity.setPrice(productDTO.getPrice());

        return parseObject(repository.save(entity), ProductDTO.class);
    }

    public void delete(Long id) {
        logger.info("Deleting one product!");
        Product entity = repository.findById(id). orElseThrow( () -> new ResourceNotFoundException("No records found for this ID!"));
        repository.delete(entity);
    }

    /**
     *  Validation to check if the raw materials sent by the user are registered in the database; if any are not, the operation will not proceed.
     *  The registered product must have an associated raw material.
     *  A quantity of raw materials less than or equal to zero required to produce a product will not be accepted.
     *
     * @param product
     * @param rawMaterials
     */
    public void rawMaterialValidation(Product product, List<ProductRawMaterialDTO> rawMaterials){

        if (rawMaterials == null || rawMaterials.isEmpty()){
            throw new IllegalArgumentException("Product must have at least one raw material with quantity greater than zero");
        }

        for(ProductRawMaterialDTO rmDTO : rawMaterials){
            RawMaterial rawMaterial = rawMaterialrepository.findById(rmDTO.getRawMaterialId()).orElseThrow(()
                    -> new ResourceNotFoundException("Raw material with ID " + rmDTO.getRawMaterialId() + " not found!"));

            if(rmDTO.getRequiredQuantity() == null || rmDTO.getRequiredQuantity().compareTo(BigDecimal.ZERO) <= 0){
                throw new IllegalArgumentException("The quantity must be greater than zero");
            }

        }
    }

    /**
     * Association of Product - Raw Material
     *
     * @param product
     * @param rawMaterials
     */
    private void associateRawMaterialsToProduct(Product product, List<ProductRawMaterialDTO> rawMaterials){
        for(ProductRawMaterialDTO rmDTO : rawMaterials){
            RawMaterial rawMaterial = rawMaterialrepository.findById(rmDTO.getRawMaterialId()).get();

            ProductRawMaterial productRawMaterial = new ProductRawMaterial();

            productRawMaterial.setProduct(product);
            productRawMaterial.setRawMaterial(rawMaterial);
            productRawMaterial.setRequiredQuantity(rmDTO.getRequiredQuantity());

            product.getRawMaterialList().add(productRawMaterial);
        }
    }


    /**
     * The price must be higher than zero
     *
     * @param price
     */
    public void priceValidation(BigDecimal price){
        if(price.compareTo(BigDecimal.ZERO) <= 0) { throw new IllegalArgumentException("The price must be higher than zero"); }
    }
}
