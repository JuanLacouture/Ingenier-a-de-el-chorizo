import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner container">
        <Link to="/" className="brand">
          Arepabuelas de la Esquina 🍳
        </Link>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/" className="btn" style={{ padding: "8px 12px" }}>
            Inicio
          </Link>
          <Link to="/login" className="btn" style={{ padding: "8px 12px" }}>
            Ingresar
          </Link>
        </nav>
      </div>
    </header>
  );
}
