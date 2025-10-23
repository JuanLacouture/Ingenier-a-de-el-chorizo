import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import logo from "../assets/images/Home/LaPintaLogo.png";
import redes from "../assets/images/Home/RedesSociales.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <img src={logo} alt="Logo" />
          <div className={styles.footerAddress}>
            <p>
              <strong>Dirección:</strong> Cra 69 #25B – 44 Of. 609
            </p>
            <p>
              <strong>Teléfono:</strong> 601 7034250
            </p>
          </div>
        </div>
        <div className={styles.footerRight}>
          <h2>
            <Link to="/about">Conócenos</Link>
          </h2>
          <img src={redes} alt="Redes Sociales" />
        </div>
      </div>
    </footer>
  );
}
