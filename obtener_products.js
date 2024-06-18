class ProductTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                th {
                    background-color: #4CAF50;
                    color: white;
                }
            </style>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody id="product-table-body">
                </tbody>
            </table>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                const tableBody = this.shadowRoot.querySelector('#product-table-body');
                data.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

customElements.define('product-table', ProductTable);
