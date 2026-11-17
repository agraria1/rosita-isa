// Elementos
const vacaInicio = document.getElementById("vaca-inicio");
const resto = document.getElementById("resto");
const diapositivas = resto.querySelectorAll(".slide");
const gracias = document.getElementById("gracias");

// Separa "MUCHAS GRACIAS" en letras para que cada una se mueva con su propio retraso
function animarLetras(elemento) {
  let indice = 0;
  const nodos = Array.from(elemento.childNodes);
  elemento.textContent = "";

  nodos.forEach((nodo) => {
    if (nodo.nodeType === Node.TEXT_NODE) {
      for (const caracter of nodo.textContent) {
        const span = document.createElement("span");
        span.className = "letra";
        span.style.setProperty("--i", indice++);
        span.textContent = caracter;
        elemento.appendChild(span);
      }
    } else {
      elemento.appendChild(nodo.cloneNode(true)); // conserva el <br>
    }
  });
  elemento.setAttribute("aria-label", "Muchas gracias");
}
animarLetras(gracias);

// Al tocar la vaquita de la primera diapositiva
let yaMostrado = false;
vacaInicio.addEventListener("click", () => {
  if (yaMostrado) return;
  yaMostrado = true;

  vacaInicio.classList.add("tocada");
  resto.classList.remove("oculto");

  // Las diapositivas van apareciendo una tras otra
  diapositivas.forEach((slide, i) => {
    slide.style.animationDelay = `${i * 0.12}s`;
    slide.classList.add("entrada");
  });

  // Baja suavemente hasta la diapositiva 2
  setTimeout(() => {
    diapositivas[0].scrollIntoView({ behavior: "smooth", block: "center" });
  }, 400);
});