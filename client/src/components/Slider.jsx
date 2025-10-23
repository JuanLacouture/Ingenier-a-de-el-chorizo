import styles from "../styles/Slider.module.css";
import bandeja from "../assets/images/Index/bandeja_grande.jpg";
import ceviche from "../assets/images/Index/Ceviche_grande.jpg";

export default function Slider() {
  const slides = [
    {
      img: bandeja,
      title: "Plato de la Temporada",
      dish: "Bandeja Paisa",
      desc: "Frijoles, arroz, carne molida, chicharrón, chorizo, huevo y plátano maduro.",
    },
    {
      img: ceviche,
      title: "Entrada de la Temporada",
      dish: "Ceviche de Camarón",
      desc: "Fresco ceviche de camarón en salsa de tomate con limón y cilantro.",
    },
  ];

  return (
    <div className={styles.sliderBox}>
      <ul>
        {slides.map((s, i) => (
          <li key={i}>
            <img src={s.img} alt={s.dish} />
            <div className={styles.text}>
              <h3>{s.title}</h3>
              <h1>{s.dish}</h1>
              <p>{s.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
