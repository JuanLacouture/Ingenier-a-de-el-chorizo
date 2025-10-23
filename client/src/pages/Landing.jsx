import Header from "../components/Header";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div>
      <Header />
      <main style={{ textAlign: "center", padding: "40px" }}>
        <h1>Landing cargada correctamente 🎉</h1>
        <p>Si ves esto, React está mostrando tu componente.</p>
      </main>
      <Slider />
      <Footer />
    </div>
  );
}
