const conn = require("../config/connection");
const express = require('express')
const app = express();

const { check, validationResult } = require('express-validator');

//CONSULTAR TODAS LAS PERSONAS
app.get('/personas',[],async(req,res)=>{

     // Pagineo, desde que registro va a comenzar el Query
     let desde = req.query.desde || 0;
     desde = Number(desde);

     // Cantidad Límite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    await conn.select("*")
        .from("vlistarpersonas")
        //.where("estado","A")
        .then(persona=>res.json({
        result: "ok",
        persona
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))

});


// //CONSULTAR PERSONAS POR IDENTIFICACON
// app.get('/personas/:identificacion',async (req,res)=>{

//     await conn.select("*")
//         .from("persona")
//         .where("identificacion",req.params.identificacion)
//         .then(persona=>res.json({
//         result: "ok",
//         persona
//     })).catch(err=>res.status(400).json({
//         result:false,
//         mensaje:err
//     }))
// });

//CONSULTAR PERSONAS POR ID
app.get('/personas/:persona_id',async (req,res)=>{

    //console.log(req.params.persona_id);

    await conn.select("*")
        .from("persona")
        .where("persona_id",req.params.persona_id)
        .then(persona=>res.json({
        result: "ok",
        persona
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
        ).then(persona=>res.json({
            result: "ok",
            mensaje: "Registro grabado con exito!",
            persona
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
    //console.log('Hola mundooo' + persona_id);
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
        .update({
            tipo_identificacion: tipo_identificacion,
            identificacion: identificacion,
            nombres: nombres,
            apellidos: apellidos,
            direccion: direccion,
            telefono: telefono,
            email: email,
            fecha_nacimiento:fecha_nacimiento,
            esCliente: esCliente,
            esProveedor: esProveedor,
        })
        .where({persona_id})
        .then(persona=>res.json({
            result: "ok",
            mensaje: "Registro actualizado con exito!",
            persona
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
        .then(persona=>res.json({
            result:"ok",
            mensaje:"Registro eliminado con exito",
            persona
        })).catch(err=>res.status(400).json({
            result:false,
            mensaje:err
        }))
});

module.exports = app;