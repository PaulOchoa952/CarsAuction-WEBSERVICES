const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://pruebainterfacesweb:1145Orbea@cluster0.oronri7.mongodb.net/subasta-db?retryWrites=true&w=majority'
)
//mongodb+srv://root:<password>@cluster0.prnnmbt.mongodb.net/?retryWrites=true&w=majority
.then(() => console.log('Conexión exitosa'))
.catch(err => console.error('Error al conectarse',err));

module.exports = mongoose;