import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateRawMaterial({ onSuccess }) {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRawMaterial = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/rawMaterial/${id}`);
        const material = response.data;

        setCode(material.code);
        setName(material.name);
        setQuantity(material.stockQuantity);
      } catch (error) {
        console.error("Error fetching raw material:", error);
      }
    };

    fetchRawMaterial();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedRawMaterial = {
      id: Number(id),
      code,
      name,
      stockQuantity: Number(quantity)
    };

    try {
      await axios.put(`http://localhost:8080/rawMaterial/${id}`, updatedRawMaterial, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Successfully updated!");
      onSuccess();
      navigate("/rawMaterial");
    } catch (error) {
      console.error("Error updating raw material:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleUpdate}>
        <h2>Update Raw Material</h2>

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

        <button type="submit" className="save-btn">Update</button>
      </form>
    </div>
  );
}