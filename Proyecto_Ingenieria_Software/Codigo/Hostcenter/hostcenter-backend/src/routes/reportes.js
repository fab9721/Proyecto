const conn = require("../config/connection");
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');


//CONSULTAR FACTURAS
app.get('/reporteventas/:fecha_desde/:fecha_hasta',[],async(req,res)=>{
    // Pagineo, desde que registro va a comenzar el Query
    let desde = req.query.desde || 0;
    desde = Number(desde);

    //console.log(req.params.fecha_desde);

    // Cantidad Límite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    await conn.select("cliente")
    .sum({total: "total",cantidad:"cantidad"})
    .from("vreporteventas")
    .whereBetween ("fecha",[req.params.fecha_desde,req.params.fecha_hasta])
    .groupBy("cliente")
    .then(reporte=>res.json({
        result: "ok",
        reporte
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))
});

module.exports = app;