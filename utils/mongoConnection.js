const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://root:1145Orbea@cluster0.prnnmbt.mongodb.net/subasta-db?retryWrites=true&w=majority'
)
//mongodb+srv://root:<password>@cluster0.prnnmbt.mongodb.net/?retryWrites=true&w=majority
.then(() => console.log('Conexión exitosa'))
.catch(err => console.error('Error al conectarse',err));

module.exports = mongoose;