package com.teste.autoflex.data.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

public class ProductRawMaterialDTO implements Serializable {
    private Long rawMaterialId;
    private String rawMaterialName;
    private BigDecimal requiredQuantity;

    public ProductRawMaterialDTO(){

    }

    public Long getRawMaterialId() {
        return rawMaterialId;
    }

    public void setRawMaterialId(Long rawMaterialId) {
        this.rawMaterialId = rawMaterialId;
    }

    public String getRawMaterialName() {
        return rawMaterialName;
    }

    public void setRawMaterialName(String rawMaterialName) {
        this.rawMaterialName = rawMaterialName;
    }

    public BigDecimal getRequiredQuantity() {
        return requiredQuantity;
    }

    public void setRequiredQuantity(BigDecimal requiredQuantity) {
        this.requiredQuantity = requiredQuantity;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ProductRawMaterialDTO that)) return false;
        return Objects.equals(getRawMaterialId(), that.getRawMaterialId()) && Objects.equals(getRawMaterialName(), that.getRawMaterialName()) && Objects.equals(getRequiredQuantity(), that.getRequiredQuantity());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRawMaterialId(), getRawMaterialName(), getRequiredQuantity());
    }
}
