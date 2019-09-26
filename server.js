const express = require('express');
var jwt = require('jsonwebtoken');

const config = require('./config.js');

const app = express();
const knex = require('./connect.js')
app.use(express.json());


var photo = express.Router()
app.use('/photo',photo);
require('./photo.js')(photo,knex)

var album = express.Router()
app.use('/album',album);
require('./album.js')(album,knex)


var user = express.Router()
app.use('/user',user);
require('./user.js')(user,knex)


app.listen(4000,()=> console.log('server is listening ..port 4000........'));
