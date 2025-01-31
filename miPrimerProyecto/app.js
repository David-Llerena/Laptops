const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const puerto=3001;

app.use(bodyParser.json());

app.use("/contactos",(req,res,next)=>{
    console.log("Middleware de contactos");
    console.log("Headers: ",req.headers); 
    console.log("Body: ",req.body);  
    next();
});

app.get("/contactos",(req,res)=>{
    const contactos=[   
        {id:1,nombre:"Juan",apellido: "Tigrero",celular:"123456"},
        {id:2,nombre:"Ana",apellido: "García",celular:"654321"},
        {id:3,nombre:"Pedro",apellido: "Martínez",celular:"456789"},
        {id:4,nombre:"Maria",apellido: "López",celular:"987654"},
        {id:5,nombre:"Luis",apellido: "Pérez",celular:"321654"},
    ]; 
    res.send(contactos);
});

app.post("/contactos",(req,res)=>{
    req.body.id=6;
    res.send(req.body);
});

app.put("/contactos/:idParam",(req,res)=>{
    const id=req.params.idParam;
    console.log("id: ",id);
    res.send(req.body);
});

app.delete("/contactos/:idParam",(req,res)=>{
    const id=req.params.idParam;
    console.log("id: ",id);
    res.send({id:id});
});

app.listen(puerto,()=>{
    console.log("Servidor Listo en el puerto "+ puerto);
});