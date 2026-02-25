import { useState } from "react";
import axios from "axios";

export default function ProductForm({ onProductAdded, rawMaterials }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const [selectedRawMaterial, setSelectedRawMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [materials, setMaterials] = useState([]);
  const [price, setPrice] = useState("");
  const addMaterial = () => {
    if (!selectedRawMaterial || !quantity) return;

    setMaterials([
      ...materials,
      {
        rawMaterialId: selectedRawMaterial,
        quantity: parseInt(quantity)
      }
    ]);

    setSelectedRawMaterial("");
    setQuantity("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      code,
      price: Number(price),
      rawMaterials: materials.map(m => ({
        rawMaterialId: m.rawMaterialId,
        requiredQuantity: m.quantity
      }))
    };

    axios.post("http://localhost:8080/product", newProduct)
      .then(response => {
         console.log("Successfully saved");

          onProductAdded();

          setName("");
          setCode("");
          setPrice("");
          setMaterials([]);
      })
      .catch(error => console.error(error));
  };

  return (
  <div className="form-container">
    <form onSubmit={handleSubmit}>

      <h2>Add Product</h2>

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
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>

      <h3>Raw Material</h3>

      <div className="material-row">
        <select
          value={selectedRawMaterial}
          onChange={(e) => setSelectedRawMaterial(Number(e.target.value))}
        >
          <option value="">Select</option>
          {rawMaterials.map(rm => (
            <option key={rm.id} value={rm.id}>
              {rm.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />

        <button type="button" onClick={addMaterial}>
          Add Raw Material
        </button>
      </div>

      {materials.length > 0 && (
        <table className="materials-table">
          <thead>
            <tr>
              <th>Matéria-Prima</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((m, index) => {
              const material = rawMaterials.find(r => r.id === m.rawMaterialId);

              return (
                <tr key={index}>
                  <td>{material ? material.name : "Desconhecido"}</td>
                  <td>{m.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <button type="submit" className="save-btn">
        Register Product
      </button>

    </form>
  </div>
  );
}