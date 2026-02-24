import { useState } from "react";

export default function RawMaterialForm({ onSuccess }) {

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRawMaterial = {
      code,
      name,
      quantity: Number(quantity)
    };

    try {
      await fetch("http://localhost:8080/raw-materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newRawMaterial)
      });

      onSuccess();

    } catch (error) {
      console.error("Error creating raw material:", error);
    }
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
        <label>Quantity in stock</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </div>

      <button type="submit" className="save-btn">
        Register Raw Material
      </button>

    </form>
  </div>
  );
}