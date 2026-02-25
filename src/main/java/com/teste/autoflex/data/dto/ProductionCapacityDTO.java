package com.teste.autoflex.data.dto;

import java.math.BigDecimal;
import java.util.Objects;

public class ProductionCapacityDTO {

    private Long productId;
    private String productName;
    private BigDecimal maxProduction;

    public ProductionCapacityDTO(){

    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getMaxProduction() {
        return maxProduction;
    }

    public void setMaxProduction(BigDecimal maxProduction) {
        this.maxProduction = maxProduction;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ProductionCapacityDTO that)) return false;
        return Objects.equals(getProductId(), that.getProductId()) && Objects.equals(getProductName(), that.getProductName()) && Objects.equals(getMaxProduction(), that.getMaxProduction());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getProductId(), getProductName(), getMaxProduction());
    }
}
