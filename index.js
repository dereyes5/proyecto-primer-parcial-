import express from 'express';
import fs from 'fs';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import path from 'path';
import {
    fileURLToPath
} from 'url';
import cors from 'cors';

const app = express();
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Sirve archivos estáticos desde el directorio raíz

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'empresa'
});

db.connect(error => {
    if (error) {
        console.log("Error al establecer la conexión");
        return;
    }
    console.log("Conexión exitosa");
});

app.listen(3000, () => {
    console.log("Server listening on Port 3000");
    console.log("API link: http://localhost:3000");
});

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    console.log(`Serving file: ${filePath}`);
    res.sendFile(filePath, err => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error al enviar el archivo');
        }
    });
});

app.get("/employees", (req, res) => {
    const query = "SELECT * FROM employees";
    db.query(query, (error, results) => {
        if (error) {
            console.log("Error al obtener los employees");
            return;
        }
        res.status(200).json(results);
    });
});

app.post("/employees", (req, res) => {
    const{name,position}=req.body;
    const query = "INSERT INTO employees (name,position) VALUES (?,?)";
    db.query(query,[name,position],(error,results)=>{
        if(error){
            console.log("Error al registrar el employees");
            return;
        }
        res.status(201).json(`employees registrado con el ID: ${results.insertId}`);
    });
});

app.get("/products", (req, res) => {
    const query = "SELECT * FROM products";
    db.query(query, (error, results) => {
        if (error) {
            console.log("Error al obtener los products");
            return;
        }
        res.status(200).json(results);
    });
});

app.post("/products", (req, res) => {
    const{name,price}=req.body;
    const query = "INSERT INTO products (name,price) VALUES (?,?)";
    db.query(query,[name,price],(error,results)=>{
        if(error){
            console.log("Error al registrar el products");
            return;
        }
        res.status(201).json(`products registrado con el ID: ${results.insertId}`);
    });
});


