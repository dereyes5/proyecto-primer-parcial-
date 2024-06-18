class mi_header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = `
        <style>
            .header{
                font-size: 0.75rem;
                background-color: #333;
                color: white;
                padding: 1rem;
                margin-bottom: 1rem;
            }
            header {
                text-align: center;
            }
            .nav {
                display: flex;
                justify-content: center;
                margin-bottom: 1rem;
            }
            .nav a {
                margin: 0 1rem;
                color: white;
                text-decoration: none;
            }
        </style>
        <div class="header">
            <header>
                <h1>PROYECTO FINAL - PARCIAL 1</h1>
                <nav class="nav">
                    <a href="/index.html">Inicio</a>
                    <a href="/mostrar_productos.html">Mostrar productos</a>
                    <a href="/ingresar_productos.html">Ingresar productos</a>
                    <a href="/mostrar_empleados.html">Mostrar empleados</a>
                    <a href="/ingresar_empleados.html">Ingresar empleados</a>
                </nav>
            </header>
        </div>
        `;
    }
}
window.customElements.define('mi-header', mi_header);
class mi_footer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = `
        <style>
            .footer{
            font-size: 0.75rem;
            background-color: #333;
            color: white;
            padding: 1em;
            position:absolute;

            width: 100%;
            }
            footer{
            text-align: center;
            }
        </style>
        <div class="footer">
        <footer>
            <p>© 2024 Universidad de las Fuerzas Armadas ESPE</p>
            <p>Desarrollado por: <strong>David Reyes y Erika Achig</strong></p>
        </footer>
        </div>
        `;
    }
}
window.customElements.define('mi-footer', mi_footer);
class mi_main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = `
        <style>
            .main {
                text-align: center;
                font-size: 3rem;
                color: #333;
                margin-bottom: 1rem; /* Add margin to create space between elements */
            }
        </style>
        <div class="contenedor">
            <div class="main">
                <h1>PROYECTO PARCIAL 1</h1>
                <h2>API-REST</h2>
            </div>
        </div>
        `;
    }
}
window.customElements.define('mi-main', mi_main);
