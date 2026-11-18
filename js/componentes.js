(() => {
    // La raíz del sitio se obtiene desde la ubicación de este archivo.
    // Así funciona tanto desde la carpeta principal como desde /artistas/.
    const scriptURL = document.currentScript && document.currentScript.src
        ? new URL(document.currentScript.src, document.baseURI)
        : new URL("js/componentes.js", document.baseURI);

    const rootURL = new URL("../", scriptURL);

    const siteURL = (page) => new URL(page, rootURL).href;

    const components = {
        leftPanel: `
            <aside class="side-panel side-left">
                <div class="side-box">
                    <h3>☆ Sobre Kitsune</h3>
                    <p class="side-center"><b>キツネ / Kitsune</b></p>
                    <p class="small">Archivo web personal.<br>Desde 2026.</p>
                    <hr>
                    <p class="small">Hecho con HTML y CSS.</p>
                    <p class="small">De: Cruz Ángelo Leonel</p>
                </div>
                <div class="side-box">
                    <h3>☆ Estado del sitio</h3>
                    <p><span class="status-dot"></span> En línea</p>
                    <p class="small">Sitio web en construcción...</p>
                </div>
            </aside>
        `,
        navigation: `
            <nav class="site-nav" aria-label="Navegación principal">
                <a href="${siteURL("index.html")}">INICIO</a> |
                <a href="${siteURL("musica.html")}">MÚSICA</a> |
                <a href="${siteURL("videojuegos.html")}">VIDEOJUEGOS</a> |
                <a href="${siteURL("cultura.html")}">CULTURA DIGITAL</a> |
                <a href="${siteURL("sobre-mi.html")}">SOBRE MÍ</a>
            </nav>
        `,
        rightPanel: `
            <aside class="side-panel side-right">
                <div class="side-box">
                    <h3>☆ Actualizaciones</h3>
                    <p class="small">05.11.2026</p>
                    <p>¡Nuevas páginas y contenido añadido!</p>
                    <hr>
                    <p class="small">04.11.2026</p>
                    <p>Kitsune está en línea.</p>
                </div>
            </aside>
        `,
        footer: `
            <footer class="site-footer">
                Kitsune · archivo personal ☆<br>
                <a href="${siteURL("musica.html")}">← Volver a Música</a> |
                <a href="${siteURL("index.html")}">INICIO</a>
            </footer>
        `
    };

    function insertComponent(id, html) {
        const container = document.getElementById(id);
        if (container) container.innerHTML = html;
    }

    function loadSharedComponents() {
        insertComponent("left-panel", components.leftPanel);
        insertComponent("site-navigation", components.navigation);
        insertComponent("right-panel", components.rightPanel);
        insertComponent("site-footer", components.footer);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", loadSharedComponents);
    } else {
        loadSharedComponents();
    }
})();
