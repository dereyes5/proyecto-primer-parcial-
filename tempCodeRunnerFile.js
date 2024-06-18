import express from 'express';
import fs from 'fs';
import mysql from 'mysql2';
import bodyParser from 'body-parser';

import cors  from 'cors'; // Importar el middleware cors

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'empresa'
});

db.connect(error=>{
    if(error){
        console.log("Error al establecer la conexion");
        return;
    }
    console.log("Conexion exitosa");
});


app.listen(3000,()=>{
    console.log("Server listening on Port 3000");
    console.log("API link: http://localhost:3000");
})

app.get("/",(req,res)=>{
    res.send("Bienvenidos a mi api");
});

const readData = ()=>{
    try{
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    }catch(error){
        console.log(error);
    }
}

app.get("/books",(req,res)=>{
    const data = readData();
    res.json(data.books);
});

app.get("/empleados",(req,res)=>{
    const query = "SELECT * FROM empleado";
    db.query(query,(error,results)=>{
        if(error){
            res.status(500).send('Error al recibir datos');
            return;
        }
        res.status(200).json(results);
    });
});

app.get("/productos",(req,res)=>{
    const query = "SELECT * FROM producto";
    db.query(query,(error,results)=>{
        if(error){
            res.status(500).json('Error al recibir datos');
            return;
        }
        res.status(200).json(results);
    });
});

app.post("/empleados",(req,res)=>{
    const {nombre, apellido, edad, cargo, salario, departamento} = req.body;
    const query = "INSERT INTO empleado(nombre, apellido, edad, cargo, salario, departamento) VALUES(?,?,?,?,?,?)";
    db.query(query,[nombre, apellido, edad, cargo, salario, departamento],(error,results)=>{
        if(error){
            res.status(500).json('Error al registar el empleado');
            return;
        }
        res.status(200).json(`Empleado registrado con el ID: ${results.insertId}`);
    });
});
app.post("/productos",(req,res)=>{
    const {nombre, descripcion, precio, stock,proveedor, categoria} = req.body;
    const query = "INSERT INTO producto(nombre, descripcion, precio, stock, proveedor, categoria) VALUES(?,?,?,?,?,?)";
    db.query(query,[nombre, descripcion, precio, stock, proveedor, categoria],(error,results)=>{
        if(error){
            res.status(500).json('Error al registar el producto');
            return;
        }
        res.status(200).json(`Producto registrado con el ID: ${results.insertId}`);
    });
});
