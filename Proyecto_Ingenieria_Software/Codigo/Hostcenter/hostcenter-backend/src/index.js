const express  = require('express');
const app = express();

//settings
app.set('port', process.env.port || 3000)

//Middlewars
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}));
// parse application/json
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//routes
app.get('/',(req,res)=>{
    res.json({"title:":"Hola Mundo"});
});

app.use(require('./routes/usuarios.js'));
app.use(require('./routes/productos.js'));
app.use(require('./routes/personas.js'));


app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
});