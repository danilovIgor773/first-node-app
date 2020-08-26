const Joi = require('joi');
const express = require('express'); //returns function
const app = express();
const logger = require('./logger');
const auth = require('./authentication');
const helmet = require('helmet'); //third-party middleware
const morgan = require('morgan'); //third-party middleware
const config = require('config');
const startUpDebug = require('debug')('app:startUp');

//============Setting view engine===========
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(logger);
app.use(auth);

//Built-in middleware - express
//app.use(express.urlencoded({ extended: true })); //extended should be added to exclude warning. This middleware serves to process the body of req

//app.use(express.static('public')); // built-in mware - work with static content 

//app.use(helmet()); // secure your app by setting http headers

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



const coursesData = [
    {id: '1', name: 'JS course'},
    {id: '2', name: 'React course'},
    {id: '3', name: 'Css course'}
];

app.get('/', (req, res) => {
    res.render('index', {
        title: "Express App",
        message: "Hello World"
    });
});

app.get('/api/courses', (req, res) => {
    res.send(coursesData);
});

app.get('/api/courses/:id', (req, res) => {
    const courseById = coursesData.find(course => course.id === req.params.id);
    if(!courseById) res.status(404).send('The course with given id is not found');
    res.send(courseById);
});

app.post('/api/courses', (req, res) => { //!!Always validate user input
    const { error } = ValidateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: coursesData.length + 1,
        name: req.body.name
    };

    coursesData.push(course);
    res.send(course);
})

//route params: all the params in request are kept in obj
//{paramName: paramVal...}
//Query string - additional info in our request, starts after "?" and goes with key=val pair 
app.get('/api/posts/:id', (req, res) => {
    res.send(`${req.params.id}`);
});


app.get('/api/photoes/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/photoes', (req, res) => {
    res.send(req.query);
});

app.put('/api/courses/:id', (req, res) => {
    const courseById = coursesData.find(course => course.id === req.params.id);
    if(!courseById) return res.status(404).send('The course with given id is not found');


    //Validate, if course found
    //invalid - 400 bad req
    
    const { error } = ValidateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //if valid:
    //update course
    //return updated course

    courseById.name = req.body.name;

    res.send(courseById);
});

app.delete('/api/courses/:id', (req, res) => {
    const courseById = coursesData.find(course => course.id === req.params.id);
    if(!courseById) return res.status(404).send('The course with given id is not found');

    const index = coursesData.indexOf(courseById);
    const deletedCourse = coursesData.splice(index, 1);

    res.send(courseById);
});

const ValidateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);    
}


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));






