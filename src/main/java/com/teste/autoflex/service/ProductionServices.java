package com.teste.autoflex.service;

import com.teste.autoflex.data.dto.ProductionCapacityDTO;
import com.teste.autoflex.model.Product;
import com.teste.autoflex.model.ProductRawMaterial;
import com.teste.autoflex.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class ProductionServices {
    private Logger logger = LoggerFactory.getLogger(ProductServices.class.getName());

    @Autowired
    private ProductRepository productRepository;

    public List<ProductionCapacityDTO> calculateProductionCapacity() {

        logger.info("Calculating the max capacity of production for each product");

        List<Product> products = productRepository.findAll();

        return products.stream().map(product -> {

            BigDecimal maxProduction = null;

            for (ProductRawMaterial prm : product.getRawMaterialList()) {

                BigDecimal stock = prm.getRawMaterial().getStockQuantity();
                BigDecimal required = prm.getRequiredQuantity();

                if (required.compareTo(BigDecimal.ZERO) == 0) continue;

                BigDecimal possible = stock.divide(required, 0, RoundingMode.DOWN);

                if (maxProduction == null || possible.compareTo(maxProduction) < 0) {
                    maxProduction = possible;
                }

                if(maxProduction == null){
                    maxProduction = BigDecimal.ZERO;
                }
            }

            ProductionCapacityDTO dto = new ProductionCapacityDTO();
            dto.setProductId(product.getId());
            dto.setProductName(product.getName());
            dto.setMaxProduction(maxProduction);

            return dto;

        }).toList();
    }
}
