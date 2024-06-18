class RegisterProduct extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                }
                form {
                    max-width: 300px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                }
                input, button {
                    margin-bottom: 10px;
                    padding: 10px;
                    font-size: 1rem;
                }
                button {
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #0056b3;
                }
            </style>

            <form id="product-form">
                <input type="text" id="name" name="name" placeholder="Nombre del producto" required>
                <input type="text" id="price" name="price" placeholder="Precio del producto" required>


                <button type="submit">Registrar Empleado</button>
            </form>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this._handleSubmit = (event) => {
            event.preventDefault();
            const name = this.shadowRoot.querySelector('#name').value;
            const price = this.shadowRoot.querySelector('#price').value;

            fetch('http://127.0.0.1:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price}),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Producto registrado:', data);
                alert('Producto registrado con éxito');
                this.limpiarCampos();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al registrar el producto');
            });
        };
        this.shadowRoot.querySelector('#product-form').addEventListener('submit', this._handleSubmit);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#product-form').removeEventListener('submit', this._handleSubmit);
    }

    limpiarCampos=()=>{
        this.shadowRoot.querySelector('#name').value='';
        this.shadowRoot.querySelector('#price').value='';
    }
}

customElements.define('register-product', RegisterProduct);
