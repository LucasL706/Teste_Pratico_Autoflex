import { useState } from "react";
import axios from "axios";

export default function RawMaterialForm({ onSuccess }) {

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRawMaterial = {
      code,
      name,
      stockQuantity: Number(quantity) // ⚠️ mesmo nome do back-end
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/rawMaterial",
        newRawMaterial,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Successfully saved:", response.data);

      // Limpar formulário
      setName("");
      setCode("");
      setQuantity("");

      // Callback para atualizar a lista de materiais
      onSuccess();

    } catch (error) {
      console.error("Error creating raw material:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add Raw Material</h2>

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
            onChange={(e) => setQuantity(e.target.value)}
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