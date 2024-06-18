class EmployeeTable extends HTMLElement {
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
                        <th>Puesto</th>
                    </tr>
                </thead>
                <tbody id="employee-table-body">
                </tbody>
            </table>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        fetch('http://localhost:3000/employees')
            .then(response => response.json())
            .then(data => {
                const tableBody = this.shadowRoot.querySelector('#employee-table-body');
                data.forEach(employee => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${employee.id}</td>
                        <td>${employee.name}</td>
                        <td>${employee.position}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

customElements.define('employee-table', EmployeeTable);
