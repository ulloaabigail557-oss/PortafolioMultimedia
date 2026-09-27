const candado = document.querySelector("#candado");
const esperar = tiempo => new Promise(resolve => setTimeout(resolve, tiempo));
let animando = false;

candado.addEventListener("click", async () => {
    if (animando) return;
    animando = true;

    const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const etapas = reducirMovimiento
        ? [["abierto", 2000]]
        : [
            ["bloqueado", 900],
            ["solicitud", 1500],
            ["codigo", 1400],
            ["validando", 1100],
            ["abierto", 2300]
        ];

    for (const [etapa, tiempo] of etapas) {
        candado.dataset.etapa = etapa;
        await esperar(tiempo);
    }

    delete candado.dataset.etapa;
    animando = false;
});

const paginaActual = location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("nav a").forEach(enlace => {
    if (enlace.getAttribute("href") === paginaActual) {
        enlace.setAttribute("aria-current", "page");
    } else {
        enlace.removeAttribute("aria-current");
    }
});