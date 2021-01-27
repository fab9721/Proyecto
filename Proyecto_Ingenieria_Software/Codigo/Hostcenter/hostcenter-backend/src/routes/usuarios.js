const conn = require("../config/connection");
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');


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

    await conn.select("*")
    .from("usuarios")
    .where({
        usuario:usuario
    })
    .then(result=>{
        try {
            //console.log('Prueba');
            
            if(result.length>0){
                
                if(!bcrypt.compare(clave, result[0]["clave"])){
                    res.status(400).json({
                        result: false,
                        mensaje: "Usuario o Contraseña Incorrecta",
                        token: ""
                    });
                }
            }else{
                res.status(401).json({
                    result: "El usuario no esta registrado"
                })
            }

            res.status(200).json({
                result:"ok",
                data:result[0]
            });

        } catch (error) {
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
app.post('/user/registrar',[
    check('tipousuario').not().isEmpty().withMessage('Dato requerido'),
    check('codigo').not().isEmpty().withMessage('Dato requerido'),
    check('usuario').not().isEmpty().withMessage('Dato requerido'),
    check('nombres').not().isEmpty().withMessage('Dato requerido'),
    check('clave').not().isEmpty().withMessage('Dato requerido') 
],async(req,res)=>{

    const {codigo,usuario,nombres,clave,tipousuario} = req.body;

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
                tipo_usuario_id : tipousuario,
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
app.post('/user/actualizar',[
    check('tipousuario').not().isEmpty().withMessage('Dato requerido'),
    check('codigo').not().isEmpty().withMessage('Dato requerido'),
    check('nombres').not().isEmpty().withMessage('Dato requerido'),
    check('clave').not().isEmpty().withMessage('Dato requerido')
],async(req,res)=>{

    const {tipousuario,codigo,usuario,nombres,clave} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            result: false,
            mensaje: errors.array()
        });
    }

    await conn("usuarios").where("codigo",codigo)
        .update({
            tipo_usuario_id: tipousuario,
            usuario: usuario,
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
app.post('/user/eliminar',[],async(req,res)=>{

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

//CONSULTAR USUARIOS
app.get('/user/all',[],async(req,res)=>{
    // Pagineo, desde que registro va a comenzar el Query
    let desde = req.query.desde || 0;
    desde = Number(desde);

    // Cantidad Límite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    await conn.select("*").from("usuarios").where("estado","A").then(data=>res.json({
        result: "ok",
        data
    })).catch(err=>res.status(400).json({
        result:false,
        mensaje:err
    }))
});
//CONSULTAR USUARIO POR ID


module.exports = app;