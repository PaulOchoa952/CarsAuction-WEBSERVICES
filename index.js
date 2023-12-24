const express = require('express');
const morgan = require('morgan');
const cors=require('cors');

require('./utils/mongoConnection');



const carrosRouter = require('./routers/carros.router');
const usersRouter =  require('./routers/users.router');
const app = express();
const port = 3003;

app.use(morgan('dev'));
app.options('*', cors());

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type, Authorization',
}));


app.get("/",(req,res)=>{
    res.send("Bienvenido a subastas de carros API")
});

app.use(express.json({limit: '50mb'}));
app.use('/carros',carrosRouter);
app.use('/users',usersRouter);
app.listen(port,()=>{
    console.log("Servidor iniciado en http://localhost:" + port);
})
