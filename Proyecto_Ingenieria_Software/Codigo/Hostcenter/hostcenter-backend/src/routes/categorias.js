const conn = require("../config/connection");
const express = require('express')
const app = express();

const { check, validationResult } = require('express-validator');


//OBTENER CATEGORIAS
app.get('/categorias/',[],async(req,res)=>{

    await conn.select("categoria_id","codigo","descripcion")
    .from("categoria")
    .where("estado",'A')
    .then(categoria=>res.json({
        result:"ok",
        categoria
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))

});

//CONSULTAR CATEGORIAS POR ID
app.get('/categorias/:categoria_id',async (req,res)=>{

    await conn.select("*")
        .from("categoria")
        .where("categoria_id",req.params.categoria_id)
        .then(categoria=>res.json({
        result: "ok",
        categoria
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))
});


//CREAR CATEGORIAS
app.post('/categorias',[
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

    await conn("categoria")
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

//EDITAR CATEGORIAS
app.put('/categorias/:categoria_id',[
    check('descripcion').not().isEmpty().withMessage('Dato requerido'),
],async(req,res)=>{

    let categoria_id = req.params.categoria_id;

    const {descripcion} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            ok: false,
            mensaje: errors.array()
        });
    }

    await conn("categoria")
        .update({
            descripcion: descripcion
        })
        .where({categoria_id})
        .then(data=>res.json({
            result: "ok",
            mensaje: "Registro actualizado con exito!",
            data
        })).catch(err=>res.status(400).json({
            result:false,
            mensaje:err
        }))

});


//ELIMINAR CATEGORIAS
app.delete('/categorias/:categoria_id',async(req,res)=>{

    let categoria_id = req.params.categoria_id;

    await conn("categoria")
        .update({
            estado:"I"
        })
        .where({
            categoria_id
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