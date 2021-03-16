const conn = require("../config/connection");
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

//CONSULTAR TIPOS DE USUARIO
app.get('/tipousuario/all',[],async(req,res)=>{

    await conn.select("tipo_usuario_id","descripcion")
    .from("tipo_usuario")
    .then(data=>res.json({
        result:"ok",
        data
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))
});



//CONSULTAR USUARIOS
app.get('/user/',[],async(req,res)=>{
    // Pagineo, desde que registro va a comenzar el Query
    let desde = req.query.desde || 0;
    desde = Number(desde);

    // Cantidad Límite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    await conn.select("*").from("vlistarusuarios").then(usuario=>res.json({
        result: "ok",
        usuario
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))
});


//INICIAR SESION
app.post('/user/login/',[
    check('usuario').not().isEmpty().withMessage('Dato requerido'),
    check('clave').not().isEmpty().withMessage('Dato requerido')
],async(req,res)=>{
    
    const {usuario,clave} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            ok: false,
            mensaje: errors.array(),
            token: ""
        });
    }
    console.log(req.body);

    await conn.select("*")
    .from("usuarios")
    .where({
        usuario:usuario
    })
    .then(async result=>{
        try {
            //console.log(clave);
            //console.log(result[0].clave);
            if(result.length>0){
                
                console.log(result);
                if(!(await bcrypt.compare(clave, result[0].clave))){
                    //De ser invalida se rechazara la solicitud de acceso
                    res.status(400).json({
                                result: false,
                                mensaje: "Usuario o Contraseña Incorrecta",
                                token: ""
                            });
                }
                else{
                    res.status(200).json({
                                result:"ok",
                                data:result[0]
                            });
                }
                
            }else{
                res.status(401).json({
                    result: "El usuario no esta registrado"
                })
            }


        } catch (error) {
            //console.log("prueba")
            //Ocurrio un error en alguna sentencia
            //Se imprimen los detalles del error en la consola
            console.log(error);
            //Se envia la respuesta al usuario
            res.status(401).json({
                result:e.message
            })
        }
    })
});

//INSERTAR USUARIO
app.post('/user',[
    check('tipo_usuario_id').not().isEmpty().withMessage('Dato requerido'),
    check('codigo').not().isEmpty().withMessage('Dato requerido'),
    check('usuario').not().isEmpty().withMessage('Dato requerido'),
    check('nombres').not().isEmpty().withMessage('Dato requerido'),
    check('clave').not().isEmpty().withMessage('Dato requerido') 
],async(req,res)=>{

    const {codigo,usuario,nombres,clave,tipo_usuario_id} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            result: false,
            mensaje: errors.array()
        });
    }

    await conn("usuarios")
        .insert(
            {
                tipo_usuario_id : tipo_usuario_id,
                codigo: codigo,
                usuario: usuario,
                nombres: nombres,
                clave: bcrypt.hashSync(clave,10),
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

//ACTUALIZAR USUARIO
app.put('/user/:usuario_id',[
    //check('nombres').not().isEmpty().withMessage('Dato requerido'),
    check('clave').not().isEmpty().withMessage('Dato requerido')
],async(req,res)=>{

    let usuario_id = req.params.usuario_id;

    const {tipo_usuario_id,nombres,clave} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            result: false,
            mensaje: errors.array()
        });
    }

    //console.log(clave);
    //console.log(bcrypt.hashSync(clave,10));

    await conn("usuarios").where("usuario_id",usuario_id)
        .update({
            tipo_usuario_id: tipo_usuario_id,
            nombres: nombres,
            clave: bcrypt.hashSync(clave,10),
        }).then(data=>res.json({
            result: "ok",
            mensaje: "Registrado actualizado con exito!",
            data
        })).catch(err=>res.status(400).json({
            result:false,
            mensaje:err
        }))

});

//INACTIVAR USUARIO
app.delete('/user/',[],async(req,res)=>{

    const {codigo,estado} = req.body;

    await conn("usuarios").where("codigo",codigo).update({
        estado: estado
    }).then(data=>res.json({
        result: "ok",
        mensaje: "Registrado eliminado con exito!",
        data
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))

});



//CONSULTAR USUARIO POR ID
app.get('/user/:usuario_id',async (req,res)=>{

    await conn.select("*")
        .from("usuarios")
        .where("usuario_id",req.params.usuario_id)
        .then(usuario=>res.json({
        result: "ok",
        usuario
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))
});

module.exports = app;