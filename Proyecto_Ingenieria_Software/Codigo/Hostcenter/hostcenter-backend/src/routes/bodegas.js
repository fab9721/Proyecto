const conn = require("../config/connection");
const express = require('express')
const app = express();

const { check, validationResult } = require('express-validator');


//OBTENER CATEGORIAS
app.get('/bodegas/',[],async(req,res)=>{

    await conn.select("bodega_id","codigo","descripcion")
    .from("bodega")
    .where("estado",'A')
    .then(bodega=>res.json({
        result:"ok",
        bodega
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))

});

//CONSULTAR PRODUCTOS POR ID
app.get('/bodegas/:bodega_id',async (req,res)=>{

    await conn.select("*")
        .from("bodega")
        .where("bodega_id",req.params.bodega_id)
        .then(bodega=>res.json({
        result: "ok",
        bodega
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))
});


//CREAR BODEGAS
app.post('/bodegas',[
    check('codigo').not().isEmpty().withMessage('Dato requerido'),
    check('descripcion').not().isEmpty().withMessage('Dato requerido')
],async(req,res)=>{
    //console.log("Hola mundo")

    const {codigo,descripcion} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            ok: false,
            mensaje: errors.array(),
            token: ""
        });
    }

    await conn("bodega")
        .insert(
            {
               codigo: codigo,
               descripcion: descripcion,
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

//EDITAR BODEGAS
app.put('/bodegas/:bodega_id',[
    check('descripcion').not().isEmpty().withMessage('Dato requerido'),
],async(req,res)=>{

    let bodega_id = req.params.bodega_id;

    const {descripcion} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            ok: false,
            mensaje: errors.array()
        });
    }

    await conn("bodega")
        .update({
            descripcion: descripcion
        })
        .where({bodega_id})
        .then(data=>res.json({
            result: "ok",
            mensaje: "Registro actualizado con exito!",
            data
        })).catch(err=>res.status(400).json({
            result:false,
            mensaje:err
        }))

});


//ELIMINAR BODEGAS
app.delete('/bodegas/:bodega_id',async(req,res)=>{

    let bodega_id = req.params.bodega_id;

    await conn("bodega")
        .update({
            estado:"I"
        })
        .where({
            bodega_id
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