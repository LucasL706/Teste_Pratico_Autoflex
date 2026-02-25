import { Link } from "react-router-dom";

export default function RawMaterialList({ rawMaterials, onDelete }) {

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this raw material?")) {
      onDelete(id);
    }
  };

  return (
    <div className="container">
      <h2>List of Raw Materials</h2>

      {rawMaterials.length === 0 ? (
        <p>None product is registered.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Stock Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rawMaterials.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.code}</td>
                <td>{p.name}</td>
                <td>{p.stockQuantity}</td>
                <td>
                    <Link to={`/rawMaterial/update/${p.id}`}>
                        <button className="edit-btn">Edit</button>
                    </Link>

                    <button
                        className="delete-btn"
                        onClick={() => handleDelete(p.id)}
                    >
                        Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}