/*
Este código en JavaScript utiliza Express para configurar un servidor web para una API de subastas de carros. Algunos puntos destacados incluyen:

Se utilizan los módulos express y morgan para la creación del servidor y el registro de solicitudes HTTP, respectivamente.

Se importan y se utilizan routers específicos para las entidades de carros, subastas y usuarios (carrosRouter, subastasRouter y usersRouter).

Se establece una conexión a la base de datos MongoDB mediante require('./utils/mongoConnection').

Se configuran encabezados CORS para permitir solicitudes desde cualquier origen.

Se define un endpoint inicial en la raíz ("/") que devuelve un mensaje de bienvenida.

Se configura el middleware express.json() para el análisis del cuerpo de la solicitud con un límite de tamaño de 50 MB.

Se establece la escucha del servidor en el puerto 3003 y se imprime un mensaje en la consola al iniciar el servidor.

En resumen, este archivo sirve como punto de entrada principal para la aplicación de subastas de carros y c
*/
const express = require('express');
const morgan = require('morgan');
const carrosRouter = require('./routers/carros.router');
const subastasRouter = require('./routers/subastas.router');
const usersRouter =  require('./routers/users.router');

require('./utils/mongoConnection');




const app = express();
const port = 3003;
app.use(morgan('dev'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, X-HTTP-Method-Override, Access-Control-Allow-Origin');
  next();
});


app.get("/",(req,res)=>{
    res.send("Bienvenido a subastas de carros API")
});

app.use(express.json({limit: '50mb'}));
app.use('/carros',carrosRouter);
app.use('/subastas',subastasRouter);
app.use('/users',usersRouter);

app.listen(port,()=>{
    console.log("Servidor iniciado en http://localhost:" + port);
})
