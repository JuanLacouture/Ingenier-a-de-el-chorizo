import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import menuIcon from "../assets/images/Menu_Hamburgesa.png";
import logo from "../assets/images/Home/LaPintaLogo.png";
import cartIcon from "../assets/images/Index/carritoIcono.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>
          <img src={menuIcon} alt="Menú" />
        </button>
        <div className={styles.dropdownContent}>
          <Link to="/about">¿Quiénes Somos?</Link>
          <Link to="/menu">Carta</Link>
          <Link to="/cart">Carrito</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>

      <h1>
        <Link to="/">La Pinta</Link>
      </h1>

      <div>
        <Link to="/cart">
          <img src={cartIcon} alt="Carrito" />
        </Link>
      </div>
    </header>
  );
}
