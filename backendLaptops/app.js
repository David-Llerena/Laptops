const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const puerto=3002;

app.use(bodyParser.json());

let laptops = [
    {
        id: 1,
        marca: "Lenovo",
        procesador: "Intel Core i7",
        memoria: "32 GB",
        disco: "2 TB"
    },
    {
        id: 2,
        marca: "HP",
        procesador: "AMD Ryzen 5",
        memoria: "16 GB",
        disco: "1 TB"
    },
    {
        id: 3,
        marca: "Dell",
        procesador: "Intel Core i5",
        memoria: "8 GB",
        disco: "512 GB"
    },
    {
        id: 4,
        marca: "Apple",
        procesador: "M1 Pro",
        memoria: "16 GB",
        disco: "1 TB"
    },
    {
        id: 5,
        marca: "Asus",
        procesador: "Intel Core i9",
        memoria: "64 GB",
        disco: "4 TB"
    }
];

// POST - Crear una laptop
app.post('/laptops', (req, res) => {
    console.log('Body recibido:', req.body);
    const newLaptop = {
        id: laptops.length + 1,
        ...req.body
    };
    laptops.push(newLaptop);
    res.json(newLaptop);
});

// GET - Recuperar una laptop específica
app.get('/laptops/:id', (req, res) => {
    const laptop = laptops.find(l => l.id === parseInt(req.params.id));
    if (laptop) {
        res.json(laptop);
    } else {
        res.status(404).json({ message: 'Laptop no encontrada' });
    }
});

// GET - Recuperar todas las laptops
app.get('/laptops', (req, res) => {
    res.json(laptops);
});

// PUT - Actualizar una laptop
app.put('/laptops/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log('Actualizando laptop con id:', id);
    
    const index = laptops.findIndex(l => l.id === id);
    if (index !== -1) {
        laptops[index] = { ...laptops[index], ...req.body };
        res.json(laptops[index]);
    } else {
        res.status(404).json({ message: 'Laptop no encontrada' });
    }
});

// DELETE - Eliminar una laptop
app.delete('/laptops/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log('Eliminando laptop con id:', id);
    
    const index = laptops.findIndex(l => l.id === id);
    if (index !== -1) {
        laptops = laptops.filter(l => l.id !== id);
        res.status(200).send();
    } else {
        res.status(404).json({ message: 'Laptop no encontrada' });
    }
});

// Iniciar el servidor
app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});