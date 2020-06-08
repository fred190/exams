const express = require('express');
const path = require('path')
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/school', { useUnifiedTopology: true, useNewUrlParser: true})
.then(results => {
    console.log(' database is  connected ....')
})
.catch(error => {
    console.log(' database is not connected')
})

app.set('view engine', 'ejs');
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootswatch/dist/journal/')));
app.use(express.urlencoded({ extended: true}));






app.use('/', require('./routes/index'));
// // fred's routes
//app.use('/fred', require('./routes/fred'));
// // Bee's routes
//app.use('/bee', require('./routes/bee'));
// // Ray's routes
//app.use('/ray', require('./routes/ray'));

const port = 4000 || process.env.PORT
app.listen(port, () =>{
    console.log(`server listening on port ${port}`)
});