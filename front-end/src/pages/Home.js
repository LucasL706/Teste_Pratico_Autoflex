import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductionCapacityList from "../components/ProductionCapacityList";

export default function Home({ products, rawMaterials }) {

  const lowStockProducts = products.filter(p => p.quantity <= 5);
  const lowStockRawMaterials = rawMaterials.filter(r => r.quantity <= 5);
  const [productionCapacity, setProductionCapacity] = useState([]);

  useEffect(() => {
    fetchProductionCapacity();
  }, []);

  const fetchProductionCapacity = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/production/productionCapacity"
      );
      setProductionCapacity(response.data);
    } catch (error) {
      console.error("Error fetching production capacity:", error);
    }
  };

  return (
    <div className="container">
      <h1>Stock Control Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h2>{products.length}</h2>
          <p>Products</p>
        </div>

        <div className="card">
          <h2>{rawMaterials.length}</h2>
          <p>Raw Materials</p>
        </div>
      </div>

      <div className="production-capacity">

        {productionCapacity.length === 0 ? (
          <p>No production data available</p>
        ) : (
          <ProductionCapacityList capacity={productionCapacity}/>
        )}
      </div>

    </div>
  );
}