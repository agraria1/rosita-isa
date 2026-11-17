document.addEventListener("DOMContentLoaded", () => {
  const vacaInicio = document.getElementById("vaca-inicio");
  const resto = document.getElementById("resto");
  const gracias = document.getElementById("gracias");
  let yaMostrado = false;

  // Separa "MUCHAS GRACIAS" en letras. Si algo falla, no afecta al resto.
  try {
    const html = gracias.innerHTML.split(/<br\s*\/?>/i);
    let indice = 0;
    gracias.innerHTML = html
      .map((linea) =>
        Array.from(linea.trim())
          .map((c) => `<span class="letra" style="--i:${indice++}">${c}</span>`)
          .join("")
      )
      .join("<br>");
    gracias.setAttribute("aria-label", "Muchas gracias");
  } catch (e) {
    console.warn("No se pudo animar las letras:", e);
  }

  function mostrarDiapositivas() {
    if (yaMostrado) return;
    yaMostrado = true;

    vacaInicio.classList.add("tocada");
    resto.classList.remove("oculto");

    const diapositivas = resto.querySelectorAll(".slide");
    diapositivas.forEach((slide, i) => {
      slide.style.animationDelay = i * 0.12 + "s";
      slide.classList.add("entrada");
    });

    setTimeout(() => {
      diapositivas[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }, 400);
  }

  // Funciona con clic, toque en el celular y teclado (Enter / espacio)
  vacaInicio.addEventListener("click", mostrarDiapositivas);
});
