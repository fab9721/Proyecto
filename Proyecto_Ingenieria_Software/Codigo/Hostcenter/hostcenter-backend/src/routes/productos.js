const conn = require("../config/connection");
const express = require('express')
const app = express();

const { check, validationResult } = require('express-validator');


//OBTENER CATEGORIAS
app.get('/categorias/all',[],async(req,res)=>{

    await conn.select("categoria_id","descripcion")
    .from("categoria")
    .then(data=>res.json({
        result:"ok",
        data
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))

});


//CONSULTAR PRODUCTOS
app.get('/productos',[],async(req,res)=>{
    // Pagineo, desde que registro va a comenzar el Query
    let desde = req.query.desde || 0;
    desde = Number(desde);

    // Cantidad Límite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    await conn.select("producto_id","codigo","descripcion","categoria_id","categoria","stock","precio_unitario","porcentaje_descuento")
        .from("vlistarproductos")
        // .where("estado","A")
        .then(producto=>res.json({
            result: "ok",
            producto
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))
});


//CONSULTAR PRODUCTOS POR ID
app.get('/productos/:producto_id',async (req,res)=>{

    await conn.select("producto_id","codigo","descripcion","categoria_id","categoria","graba_iva","stock","precio_unitario","porcentaje_descuento")
        .from("vlistarproductos")
        .where("producto_id",req.params.producto_id)
        .then(producto=>res.json({
        result: "ok",
        producto
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))
});

//CREAR PRODUCTOS
app.post('/productos',[
    check('codigo').not().isEmpty().withMessage('Dato requerido'),
    check('categoria_id').not().isEmpty().withMessage('Dato requerido'),
    check('descripcion').not().isEmpty().withMessage('Dato requerido'),
    check('stock').not().isEmpty().withMessage('Dato requerido'),
    check('precio_unitario').not().isEmpty().withMessage('Dato requerido') 
],async(req,res)=>{
    //console.log("Hola mundo")

    const {codigo,categoria_id,descripcion,stock,graba_iva,precio_unitario,porcentaje_descuento} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            ok: false,
            mensaje: errors.array(),
            token: ""
        });
    }

    await conn("producto")
        .insert(
            {
               codigo: codigo,
               categoria_id: categoria_id,
               descripcion: descripcion,
               stock: stock,
               graba_iva: graba_iva,
               precio_unitario: precio_unitario,
               porcentaje_descuento: (porcentaje_descuento==null?0:porcentaje_descuento),
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

//EDITAR PRODUCTOS
app.put('/productos/:producto_id',[
    check('categoria_id').not().isEmpty().withMessage('Dato requerido'),
    check('descripcion').not().isEmpty().withMessage('Dato requerido'),
    check('stock').not().isEmpty().withMessage('Dato requerido'),
    check('precio_unitario').not().isEmpty().withMessage('Dato requerido') 
],async(req,res)=>{

    let producto_id = req.params.producto_id;

    const {categoria_id,descripcion,stock,graba_iva,precio_unitario,porcentaje_descuento} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            ok: false,
            mensaje: errors.array()
        });
    }

    await conn("producto")
        .update({
            categoria_id:categoria_id,
            descripcion: descripcion,
            stock: stock,
            graba_iva: graba_iva,
            precio_unitario: precio_unitario,
            porcentaje_descuento: (porcentaje_descuento==null?0:porcentaje_descuento)
        })
        .where({producto_id})
        .then(data=>res.json({
            result: "ok",
            mensaje: "Registro actualizado con exito!",
            data
        })).catch(err=>res.status(400).json({
            result:false,
            mensaje:err
        }))

});

//ELIMINAR PRODUCTOS
app.delete('/productos/:producto_id',async(req,res)=>{

    let producto_id = req.params.producto_id;

    await conn("producto")
        .update({
            estado:"I"
        })
        .where({
            producto_id
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