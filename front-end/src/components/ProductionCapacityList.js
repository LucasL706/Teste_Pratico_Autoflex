export default function ProductionCapacityList({ capacity }) {

  return (
    <div className="container">
      <h2>Production Capacity</h2>

      {capacity.length === 0 ? (
        <p>No production data available.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Max Production</th>
            </tr>
          </thead>
          <tbody>
            {capacity.map(item => (
              <tr key={item.productId}>
                <td>{item.productName}</td>
                <td
                  style={{
                    color: item.maxProduction == 0 ? "red" : "black",
                    fontWeight: item.maxProduction == 0 ? "bold" : "normal"
                  }}
                >
                  {item.maxProduction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}