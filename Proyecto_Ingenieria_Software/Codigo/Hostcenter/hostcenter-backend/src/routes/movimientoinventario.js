const conn = require("../config/connection");
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');



//OBTENER BODEGAS
app.get('/bodega/all',[],async(req,res)=>{

    await conn.select("bodega_id","descripcion") 
    .from("bodega")
    .where("estado",'A')
    .then(data=>res.json({
        result:"ok",
        data
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))

});


//OBTENER ITEMS
app.get('/items/all',[],async(req,res)=>{

    await conn.select("producto_id","descripcion","precio_unitario") 
    .from("producto")
    .where("estado",'A')
    .then(data=>res.json({
        result:"ok",
        data
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))

});


//CONSULTAR FACTURAS
app.get('/inventarios/',[],async(req,res)=>{
    // Pagineo, desde que registro va a comenzar el Query
    let desde = req.query.desde || 0;
    desde = Number(desde);

    // Cantidad Límite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    await conn.select("*").from("vlistarinventario").then(inventario=>res.json({
        result: "ok",
        inventario
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))
});

//CONSULTAR MOVIMIENTOS DE INVENTARIO POR ID
app.get('/inventarios/:movimiento_inventario_id',[],async(req,res)=>{
    //console.log(req.params.factura_id);

    let inventario =  await conn.select("*").from("vlistarinventario")
    .where("movimiento_inventario_id",req.params.movimiento_inventario_id)

    let inventario_detalle = await conn.select("*").from("vlistarinventariosdetalles")
    .where("movimiento_inventario_id",req.params.movimiento_inventario_id)

    console.log(inventario);
    console.log(inventario_detalle);

    //let arreglo = []

    const arreglo = inventario.map(item => ({
        ...item,
     detalle: inventario_detalle.filter(d => d.movimiento_inventario_id === item.movimiento_inventario_id)
    }))

    //console.log(arreglo);

    res.status(200).json(arreglo);
});

//CREAR MOVIMIENO INVENTARIO
app.post('/inventarios',[
],async(req,res)=>{
    //console.log("Hola mundo")

    //const {codigo,descripcion} = req.body;

    let data = req.body;
    //console.log(data);
    let bodega_id = data["bodega_id"]
    let tipo = data["tipo"]
    let fecha = data["fecha"]

    let detalle = data["detalle"]



    //console.log(detalle)


    //SE OBTIENE EL ULTIMO MOVIMIENTO CRONOLOGICO PARA OBTENER ESE ID Y UBICARLO EN EL DETALLE DEL MOVIMIENTO
    let inventario = await conn("movimiento_inventario").orderBy("movimiento_inventario_id", "DESC").limit(1);

    //console.log(inventario);
    let idInventario = inventario.length==0 ? 0 : inventario[0].movimiento_inventario_id;
    //console.log(idInventario);
    //console.log(factura[0]);
    //console.log(idFactura);
    //Se crea una transaccion
    conn.transaction(trx=>{

        try {
            
            //Se declara una matriz que maneje todas las operaciones de la transaccion
            const queries = [];

            //EMPEZAMOS CON LOS DATOS DEL DETALLE DEL MOVIMIENTO DE INVENTARIO
            //RECORREMOS CADA UNO DE LOS DETALLES
            //console.log(detalle);
            for (let i = 0; i < detalle.length; i++) {
                //SE ASIGNA CADA UNO DE LOS DETALLES A LA ESCRITURA DE LA TABLA DE FACTURA DETALLE
                
                let queryDetalle = trx("movimiento_inventario_detalle").insert({
                    movimiento_inventario_id : idInventario+1,
                    producto_id:detalle[i].producto_id,
                    cantidad:detalle[i].cantidad,
                    precio_unitario : detalle[i].precio_unitario,
                    total:detalle[i].total

                })
                queries.push(queryDetalle);
                
            }

            //SE ASIGNA LA INSERCCION DE LOS DATOS A LA FACTURA CABECERA
            let queryCabecera = trx("movimiento_inventario").insert({
                tipo: tipo,
                fecha: fecha,
                bodega_id: bodega_id,
                estado:'A'
            })

            //AGREGO EL QUERY AL CONJUNTO DE QUERYS
            queries.push(queryCabecera);

            // //Se ejecutan las operaciones en una transaccion unica

            Promise.all(queries)
                .then(trx.commit)
                .then(()=>{
                    //conn.destroy();
                    //TRANSACCION COMPLETADA CON EXITO
                    res.status(200).json({
                        result: "Registro exitoso"
                    })
                })
                .catch(trx.rollback)
                .catch(e=>{
                    conn.destroy();
                    //TRANSACCION ANULADA Y REVERTIDA
                    console.log(e)
                    res.status(500).json({
                        result: e.message
                    })
                })

        } catch (e) {
            console.log(e)
            trx.rollback()
                .then(()=>{
                    conn.destroy();
                    
                    res.status(500).json({
                        result:"Todas las operaciones se revirtieron"
                    })
                })
                .catch(e=>{
                    conn.destroy();
                    console.log(e);
                    res.status(500).json({
                        result: "Error, fallo el rollback"
                    })
                })
        }

    })

});


//ELIMINAR MOVIMIENTOS DE INVENTARIO
app.delete('/inventarios/:inventario_id',async(req,res)=>{

    let movimiento_inventario_id = req.params.inventario_id;

    await conn("movimiento_inventario")
        .update({
            estado:"I"
        })
        .where({
            movimiento_inventario_id
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