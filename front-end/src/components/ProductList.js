export default function ProductList({ products }) {
  return (
    <div className="container">
      <h2>List of Products</h2>

      {products.length === 0 ? (
        <p>None product is registered.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.code}</td>
                <td>{p.name}</td>
                <td>R$ {p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}