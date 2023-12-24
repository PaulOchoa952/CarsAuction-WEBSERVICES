const express = require('express');
const morgan = require('morgan');
const carrosRouter = require('./routers/carros.router');
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
app.use('/users',usersRouter);

app.listen(port,()=>{
    console.log("Servidor iniciado en http://localhost:" + port);
})
