import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateProduct({ onSuccess }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          `http://localhost:8080/product/${id}`
        );

        console.log(productResponse.data);

        const rawMaterialsResponse = await axios.get(
          "http://localhost:8080/rawMaterial"
        );

        const product = productResponse.data;

        setCode(product.code);
        setName(product.name);
        setPrice(product.price);

        setSelectedMaterials(product.rawMaterials || []);
        setAvailableMaterials(rawMaterialsResponse.data);

      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    fetchData();
  }, [id]);

  const addMaterial = () => {
    setSelectedMaterials([
      ...selectedMaterials,
      { rawMaterialId: "", requiredQuantity: 1 }
    ]);
  };

  const removeMaterial = (index) => {
    const updated = [...selectedMaterials];
    updated.splice(index, 1);
    setSelectedMaterials(updated);
  };

  const handleMaterialChange = (index, field, value) => {
    const updated = [...selectedMaterials];
    updated[index][field] = value;
    setSelectedMaterials(updated);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: Number(id),
      code,
      name,
      price: Number(price),
      rawMaterials: selectedMaterials.map((m) => ({
        rawMaterialId: Number(m.rawMaterialId),
        requiredQuantity: Number(m.requiredQuantity)
      }))
    };

    try {
      await axios.put(
        `http://localhost:8080/product/${id}`,
        updatedProduct,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log("Product updated successfully!");
      if (onSuccess) onSuccess();
      navigate("/product");

    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleUpdate}>
        <h2>Update Product</h2>

        <div className="field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <h3>Raw Materials</h3>

        {selectedMaterials.map((material, index) => (
          <div key={index} className="material-row">

            <select
              value={material.rawMaterialId}
              onChange={(e) =>
                handleMaterialChange(index, "rawMaterialId", e.target.value)
              }
              required
            >
              <option value="">Select material</option>
              {availableMaterials.map((rm) => (
                <option key={rm.id} value={rm.id}>
                  {rm.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={material.requiredQuantity}
              onChange={(e) =>
                handleMaterialChange(index, "requiredQuantity", e.target.value)
              }
              min="1"
              required
            />

            <button
              type="button"
              onClick={() => removeMaterial(index)}
              className="delete-btn"
            >
              Remove
            </button>

          </div>
        ))}

        <button
          type="button"
          onClick={addMaterial}
          style={{ marginTop: "10px" }}
        >
          Add Raw Material
        </button>

        <br /><br />

        <button type="submit" className="save-btn">
          Update
        </button>

      </form>
    </div>
  );
}