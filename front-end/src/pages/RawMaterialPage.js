import RawMaterialList from "../components/RawMaterialList";
import { Link } from "react-router-dom";

export default function RawMaterialPage({ rawMaterials, fetchRawMaterials }) {

    const handleDeleteRawMaterial = async (id) => {
      await fetch(`http://localhost:8080/rawMaterial/${id}`, {
        method: "DELETE"
      });

      fetchRawMaterials();
    };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Raw Materials</h2>

        <Link to="/rawMaterial/create">
          <button>New Raw Material</button>
        </Link>
        </div>

        <RawMaterialList
          rawMaterials={rawMaterials}
          onDelete={handleDeleteRawMaterial}
        />
    </div>
  );
}