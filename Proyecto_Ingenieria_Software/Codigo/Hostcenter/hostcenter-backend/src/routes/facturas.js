const conn = require("../config/connection");
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');


//OBTENER PERSONAS
app.get('/persona/all',[],async(req,res)=>{

    await conn.select("persona_id",conn.raw('CONCAT(apellidos,\' \',nombres) as "nombres"') )
    .from("persona")
    .where("esCliente",'1')
    .then(data=>res.json({
        result:"ok",
        data
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))

});

//OBTENER VENDEDORES
app.get('/vendedor/all',[],async(req,res)=>{

    await conn.select("persona_id",conn.raw('CONCAT(apellidos,\' \',nombres) as "nombres"') )
    .from("persona")
    .where("esProveedor",'1')
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

    await conn.select("producto_id","descripcion","precio_unitario","stock","graba_iva","porcentaje_descuento") 
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
app.get('/facturas/',[],async(req,res)=>{
    // Pagineo, desde que registro va a comenzar el Query
    let desde = req.query.desde || 0;
    desde = Number(desde);

    // Cantidad Límite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    await conn.select("*").from("vlistarFacturas").then(factura=>res.json({
        result: "ok",
        factura
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))
});

//CONSULTAR FACTURAS POR ID
app.get('/facturas/:factura_id',[],async(req,res)=>{
    //console.log(req.params.factura_id);

    let factura =  await conn.select("*").from("vlistarfacturas")
    .where("factura_id",req.params.factura_id)

    let factura_detalle = await conn.select("*").from("vlistarfacturasdetalles")
    .where("factura_id",req.params.factura_id)

    console.log(factura);
    console.log(factura_detalle)

    //let arreglo = []

    const arreglo = factura.map(item => ({
        ...item,
     detalle: factura_detalle.filter(d => d.factura_id === item.factura_id)
    }))

    //console.log(arreglo);

    res.status(200).json(arreglo);
});


//CREAR FACTURA
app.post('/facturas',[
],async(req,res)=>{
    //console.log("Hola mundo")

    //const {codigo,descripcion} = req.body;

    let data = req.body;
    //console.log(data);
    let persona_id = data["persona_id"]
    let vendedor_id = data["vendedor_id"]
    let fecha = data["fecha"]
    let cantidad_total = data["cantidad_total"]>0?data["cantidad_total"]:0;
    let valor_total = data["valor_total"]
    let total_iva = data["total_iva"]
    let total_descuento = data["total_descuento"]

    let detalle = data["detalle"]



    //console.log(detalle)


    //SE OBTIENE LA ULTIMA FACTURA CRONOLOGICO PARA OBTENER ESE ID Y UBICARLO EN EL DETALLE DE LA FACTURA
    let factura = await conn("factura").orderBy("fecha", "DESC").limit(1);

    // factura = [
    //     {
    //         idFactura:0
    //     }
    // ]

    let idFactura = factura.length==0 ? 0 : factura[0].factura_id
    //console.log(factura[0]);
    //console.log(idFactura);
    //Se crea una transaccion
    conn.transaction(trx=>{

        try {
            
            //Se declara una matriz que maneje todas las operaciones de la transaccion
            const queries = [];

            //EMPEZAMOS CON LOS DATOS DEL DETALLE DE LA FACTURA
            //RECORREMOS CADA UNO DE LOS DETALLES
            for (let i = 0; i < detalle.length; i++) {
                //SE ASIGNA CADA UNO DE LOS DETALLES A LA ESCRITURA DE LA TABLA DE FACTURA DETALLE

                //console.log(detalle[i].producto_id);
                
                let queryDetalle = trx("factura_detalle").insert({
                    factura_id : idFactura+1,
                    producto_id:detalle[i].producto_id,
                    cantidad:detalle[i].cantidad,
                    precio_unitario : detalle[i].precio_unitario,
                    subtotal : detalle[i].subtotal,
                    valor_iva : detalle[i].valor_iva,
                    valor_descuento : detalle[i].valor_descuento,
                    valor_total:detalle[i].valor_total

                })
                //AGREGO LOS CAMPOS DE SUMATORIA TOTAL
                cantidad_total = Number(cantidad_total) + Number(detalle[i].cantidad)
                valor_total = Number(valor_total)+Number(detalle[i].valor_total)
                total_iva = Number(total_iva)+Number(detalle[i].valor_iva)
                total_descuento = Number(total_descuento)+Number(detalle[i].valor_descuento)

                //console.log(cantidad_total);
                //console.log(valor_total);
                //console.log(total_iva);
                //console.log(total_descuento);
                //console.log(detalle[i])
                //AGREGO EL QUERY AL CONJUNTO DE QUERYS
                queries.push(queryDetalle);
                
            }

            //SE ASIGNA LA INSERCCION DE LOS DATOS A LA FACTURA CABECERA
            let queryCabecera = trx("factura").insert({
                persona_id: persona_id,
                vendedor_id: vendedor_id,
                fecha: fecha,
                cantidad_total: cantidad_total,
                valor_total: valor_total,
                total_iva: total_iva,
                total_descuento: total_descuento,
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


//ELIMINAR FACTURAS
app.delete('/facturas/:factura_id',async(req,res)=>{

    let factura_id = req.params.factura_id;

    await conn("factura")
        .update({
            estado:"I"
        })
        .where({
            factura_id
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