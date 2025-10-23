// ===============================
// 🔐 Conexión con Supabase
// ===============================
const SUPABASE_URL = "https://zqypgiuuoxckvngxsugt.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxeXBnaXV1b3hja3ZuZ3hzdWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODUwMDUsImV4cCI6MjA3NjY2MTAwNX0.7HhmphPoBvbj2tIJOY_gYkA_GwUHQ1x9YcehdAuVM04";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===============================
// 🧠 Lógica principal
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-registro");
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const foto = document.getElementById("foto");
  const imgPreview = document.getElementById("img-preview");
  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirm = document.getElementById("toggleConfirm");

  // ===============================
  // 👁️ Mostrar / ocultar contraseñas
  // ===============================
  togglePassword.addEventListener("click", () => {
    const type = password.type === "password" ? "text" : "password";
    password.type = type;
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
  });

  toggleConfirm.addEventListener("click", () => {
    const type = confirmPassword.type === "password" ? "text" : "password";
    confirmPassword.type = type;
    toggleConfirm.textContent = type === "password" ? "👁️" : "🙈";
  });

  // ===============================
  // 🖼️ Vista previa imagen
  // ===============================
  foto.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSize) {
      showError(foto, "La foto no puede superar los 10 MB.");
      foto.value = "";
      imgPreview.style.display = "none";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.src = e.target.result;
      imgPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
    clearError(foto);
  });

  // ===============================
  // 💡 Validaciones
  // ===============================
  const validations = {
    nombre: {
      check: (val) => val.length >= 4 && val.length <= 15,
      msg: "Debe tener entre 4 y 15 caracteres.",
    },
    correo: {
      check: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      msg: "Correo inválido (ejemplo@correo.com).",
    },
    password: {
      check: (val) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/.test(val),
      msg: "Debe tener 10+ caracteres, mayúsculas, minúsculas, número y símbolo.",
    },
  };

  function showError(input, message) {
    const small = input.parentElement.querySelector(".error-text");
    input.classList.add("invalid");
    input.classList.remove("valid");
    if (small) {
      small.textContent = message;
      small.style.display = "block";
    }
  }

  function clearError(input) {
    const small = input.parentElement.querySelector(".error-text");
    input.classList.add("valid");
    input.classList.remove("invalid");
    if (small) {
      small.textContent = "";
      small.style.display = "none";
    }
  }

  // ===============================
  // ⌨️ Validación en tiempo real
  // ===============================
  [nombre, correo, password, confirmPassword].forEach((input) => {
    input.addEventListener("input", () => {
      const val = input.value.trim();
      const rule = validations[input.id];

      if (rule && !rule.check(val)) showError(input, rule.msg);
      else if (input.id === "confirmPassword") {
        if (confirmPassword.value !== password.value)
          showError(confirmPassword, "Las contraseñas no coinciden.");
        else clearError(confirmPassword);
      } else clearError(input);
    });
  });

  // ===============================
  // ✅ Enviar formulario a Supabase
  // ===============================
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valid = true;
    [nombre, correo, password].forEach((input) => {
      const val = input.value.trim();
      const rule = validations[input.id];
      if (!rule.check(val)) {
        showError(input, rule.msg);
        valid = false;
      }
    });

    if (confirmPassword.value !== password.value) {
      showError(confirmPassword, "Las contraseñas no coinciden.");
      valid = false;
    }

    if (!foto.files.length) {
      showError(foto, "Debes seleccionar una foto de perfil.");
      valid = false;
    }

    if (!valid) {
      alert("❌ Corrige los errores antes de continuar.");
      return;
    }

    try {
      // Registrar usuario
      const { data, error } = await supabase.auth.signUp({
        email: correo.value.trim(),
        password: password.value.trim(),
        options: {
          data: {
            nombre: nombre.value.trim(),
          },
        },
      });

      if (error) throw error;

      // Subir imagen al bucket "perfil-usuarios"
      const user = data.user;
      if (foto.files.length && user) {
        const file = foto.files[0];
        const fileName = `${user.id}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("perfil-usuarios")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: true,
            contentType: file.type,
          });

        if (uploadError) throw uploadError;
      }

      alert("✅ Registro exitoso. Revisa tu correo para confirmar tu cuenta.");
      form.reset();
      imgPreview.style.display = "none";
    } catch (err) {
      console.error(err);
      alert("❌ Error al registrar usuario: " + err.message);
    }
  });
});
