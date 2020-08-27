const express = require('express'); //returns function
const app = express();
const logger = require('./middleware/logger');
const auth = require('./middleware/authentication');
const helmet = require('helmet'); //third-party middleware
const morgan = require('morgan'); //third-party middleware
const config = require('config');
const startUpDebug = require('debug')('app:startUp');
const courses = require('./routes/courses');
const home = require('./routes/home');

//============Setting view engine===========
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(logger);
app.use(auth);

//Built-in middleware - express
app.use(express.urlencoded({ extended: true })); //extended should be added to exclude warning. This middleware serves to process the body of req

app.use(express.static('public')); // built-in mware - work with static content 

app.use(helmet()); // secure your app by setting http headers

//===========Handle existing routes ================== 
app.use('/', home);

app.use('/api/courses', courses);

//==================Using process.env==================
//console.log('[Porcess.env]', process.env.NODE_ENV); // by default undefined
// console.log(`app: ${app.get('env')}`) // detect the current env - by def is "development"

if(app.get('env') === 'development'){
    app.use(morgan('tiny')); // log http requests
    startUpDebug('[Morgan] enabled ....');    
}

//=================Configuration================
console.log('[App name]: ', config.get("name"));
console.log('[Mail host]: ', config.get("mail.host"));
console.log('[Mail password]: ', config.get("mail.password"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));