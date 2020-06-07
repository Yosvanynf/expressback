const express = require('express');
const app = express();
const morgan = require('morgan');
const mongodb = require('mongoose');
const indexRoutes = require('./Routes/index');
const cors = require('cors');

//Connecting db
mongodb.connect('mongodb://localhost/Task', { useNewUrlParser: true, useUnifiedTopology: true })
 .then(db => console.log('Db coneccted'))
 .catch(err => console.log('err'));

//settings
app.set('port', process.env.PORT || 3001);   //define el puerto del server
app.set('views', __dirname + '/Views');
app.set('view engine', 'ejs');
app.set('json spaces', 2);
app.use(cors());
 

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));  //enteder las peticiones html
app.use(express.json());


//routes
app.use('/Tasks', indexRoutes);

//Server
app.listen(app.get('port'), () => {
   console.log(`Server on port ${app.get('port')}`);    
}); 
