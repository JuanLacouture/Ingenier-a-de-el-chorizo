import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !pass) {
      setMsg("Por favor ingresa tus datos");
    } else {
      setMsg("Inicio de sesión simulado correctamente 🍳");
    }
  };

  return (
    <main className="container" style={{ marginTop: 60, maxWidth: 500 }}>
      <div className="card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">Correo electrónico</label>
          <input
            className="input"
            type="email"
            placeholder="tu_correo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label mt-2">Contraseña</label>
          <input
            className="input"
            type="password"
            placeholder="••••••••"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button className="btn mt-3" type="submit">
            Entrar
          </button>

          {msg && (
            <p className="mt-2" style={{ color: "#0a7d38" }}>
              {msg}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
