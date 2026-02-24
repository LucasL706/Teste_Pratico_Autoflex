import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/rawMaterial")
      .then(response => setProducts(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Lista de Produtos</h2>

      {products.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Código</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}