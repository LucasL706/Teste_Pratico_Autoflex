package com.teste.autoflex.data.dto;

import com.teste.autoflex.model.RawMaterial;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

public class RawMaterialDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String code;
    private String name;
    private BigDecimal stockQuantity;

    public RawMaterialDTO(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(BigDecimal stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof RawMaterialDTO that)) return false;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getCode(), that.getCode()) && Objects.equals(getName(), that.getName()) && Objects.equals(getStockQuantity(), that.getStockQuantity());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getCode(), getName(), getStockQuantity());
    }
}
