package com.teste.autoflex.data.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ProductDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String code;
    private String name;
    private BigDecimal price;
    private List<ProductRawMaterialDTO> rawMaterials = new ArrayList<>();

    public ProductDTO(){

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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public List<ProductRawMaterialDTO> getRawMaterials() {
        return rawMaterials;
    }

    public void setRawMaterials(List<ProductRawMaterialDTO> rawMaterials) {
        this.rawMaterials = rawMaterials;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ProductDTO that)) return false;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getCode(), that.getCode()) && Objects.equals(getName(), that.getName()) && Objects.equals(getPrice(), that.getPrice()) && Objects.equals(getRawMaterials(), that.getRawMaterials());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getCode(), getName(), getPrice(), getRawMaterials());
    }
}
