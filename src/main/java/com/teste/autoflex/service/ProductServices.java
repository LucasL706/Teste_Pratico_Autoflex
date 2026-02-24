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

        product.setRawMaterialList(new ArrayList<>());

        rawMaterialValidation(product, productDTO.getRawMaterials());

        return parseObject(repository.save(product), ProductDTO.class);
    }

    public ProductDTO update(ProductDTO product) {
        logger.info("Updating one product!");

        Product entity = repository.findById(product.getId()). orElseThrow( () -> new ResourceNotFoundException("No records found for this ID!"));

        entity.setCode(product.getCode());
        entity.setName(product.getName());
        entity.setPrice(product.getPrice());

        return parseObject(repository.save(entity), ProductDTO.class);
    }

    public void delete(Long id) {
        logger.info("Deleting one product!");
        Product entity = repository.findById(id). orElseThrow( () -> new ResourceNotFoundException("No records found for this ID!"));
        repository.delete(entity);
    }

    /** Validação para saber se as matérias primas enviadas pelo usuário está registrada no BD, caso alguma não esteja a operação não prossegue.
     *  O produto cadastrado deve obrigatóriamente possuir uma matéria prima associada.
     *  Não será aceito quantidade menor ou igual a zero de matérias primas necessárias para produzir um produto
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

            ProductRawMaterial productRawMaterial = new ProductRawMaterial();

            productRawMaterial.setProduct(product);
            productRawMaterial.setRawMaterial(rawMaterial);
            productRawMaterial.setRequiredQuantity(rmDTO.getRequiredQuantity());

            product.getRawMaterialList().add(productRawMaterial);

        }
    }
}
