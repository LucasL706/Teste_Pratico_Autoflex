export default function RawMaterialList({ rawMaterials }) {
  return (
    <div className="container">
      <h2>List of Raw Materials</h2>

      {rawMaterials.length === 0 ? (
        <p>None raw material is registered.</p>
      ) : (
        <table className="rawMaterial-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {rawMaterials.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.code}</td>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}