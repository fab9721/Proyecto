const conn = require("../config/connection");
const express = require('express')
const app = express();

const { check, validationResult } = require('express-validator');

//CONSULTAR TODAS LAS PERSONAS
app.get('/personas',[],async(req,res)=>{

     // Pagineo, desde que registro va a comenzar el Query
     let desde = req.query.desde || 0;
     desde = Number(desde);
    ///pruebas de cambios
     // Cantidad Límite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    await conn.select("*")
        .from("persona")
        .where("estado","A")
        .then(data=>res.json({
        result: "ok",
        data
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))

});


//CONSULTAR PERSONAS POR IDENTIFICACON
app.get('/personas/:identificacion',async (req,res)=>{

    await conn.select("*")
        .from("persona")
        .where("identificacion",req.params.identificacion)
        .then(data=>res.json({
        result: "ok",
        data
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))
});


//CREAR PERSONAS
app.post('/personas',[
    check('tipo_identificacion').not().isEmpty().withMessage('Dato requerido'),
    check('identificacion').not().isEmpty().withMessage('Dato requerido'),
    check('nombres').not().isEmpty().withMessage('Dato requerido'),
    check('apellidos').not().isEmpty().withMessage('Dato requerido'),
    check('direccion').not().isEmpty().withMessage('Dato requerido'),
    check('email').not().isEmpty().withMessage('Dato requerido')
],async(req,res)=>{
    //console.log("Hola mundo")

    const {
        tipo_identificacion,
        identificacion,
        nombres,
        apellidos,
        direccion,
        telefono,
        email,
        fecha_nacimiento,
        esCliente,
        esProveedor
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            ok: false,
            mensaje: errors.array()
        });
    }

    await conn("persona")
        .insert(
            {
               tipo_identificacion: tipo_identificacion,
               identificacion: identificacion,
               nombres: nombres,
               apellidos: apellidos,
               direccion: direccion,
               telefono: telefono,
               email: email,
               fecha_nacimiento,
               esCliente: esCliente,
               esProveedor: esProveedor,
               estado: "A"
            }
        ).then(data=>res.json({
            result: "ok",
            mensaje: "Registro grabado con exito!",
            data
        })).catch(err=>res.status(400).json({
            result:false,
            mensaje:err
        }))
});


//EDITAR PERSONAS
app.put('/personas/:persona_id',[
    check('identificacion').not().isEmpty().withMessage('Dato requerido'),
    check('nombres').not().isEmpty().withMessage('Dato requerido'),
    check('apellidos').not().isEmpty().withMessage('Dato requerido'),
],async(req,res)=>{

    let persona_id = req.params.persona_id;

    const {
        identificacion,
        nombres,
        apellidos,
        direccion,
        telefono,
        email,
        fecha_nacimiento,
        esCliente,
        esProveedor
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            ok: false,
            mensaje: errors.array()
        });
    }

    await conn("persona")
        .update({
            identificacion: identificacion,
            nombres: nombres,
            apellidos: apellidos,
            direccion: direccion,
            telefono: telefono,
            email: email,
            fecha_nacimiento,
            esCliente: esCliente,
            esProveedor: esProveedor,
        })
        .where({persona_id})
        .then(data=>res.json({
            result: "ok",
            mensaje: "Registro actualizado con exito!",
            data
        })).catch(err=>res.status(400).json({
            result:false,
            mensaje:err
        }))

});

//ELIMINAR PERSONAS
app.delete('/personas/:persona_id',async(req,res)=>{

    let persona_id = req.params.persona_id;

    await conn("persona")
        .update({
            estado:"I"
        })
        .where({
            persona_id
        })
        .then(data=>res.json({
            result:"ok",
            mensaje:"Registro eliminado con exito",
            data
        })).catch(err=>res.status(400).json({
            result:false,
            mensaje:err
        }))
});

module.exports = app;