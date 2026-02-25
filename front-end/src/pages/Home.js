import { Link } from "react-router-dom";

export default function Home({ products, rawMaterials }) {

  const lowStockProducts = products.filter(p => p.quantity <= 5);
  const lowStockRawMaterials = rawMaterials.filter(r => r.quantity <= 5);

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


      <div className="alerts">
        <h3>Low Stock Alerts:</h3>

        {lowStockProducts.length === 0 && lowStockRawMaterials.length === 0 ? (
          <p>No low stock items</p>
        ) : (
          <ul>
            {lowStockProducts.map(p => (
              <li key={`product-${p.id}`}>
                Product: {p.name} - {p.quantity} units
              </li>
            ))}

            {lowStockRawMaterials.map(r => (
              <li key={`raw-${r.id}`}>
                Raw Material: {r.name} - {r.quantity} units
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}