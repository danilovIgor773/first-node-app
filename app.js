const Joi = require('joi');
const express = require('express'); //returns function
const app = express();

const coursesData = [
    {id: '1', name: 'JS course'},
    {id: '2', name: 'React course'},
    {id: '3', name: 'Css course'}
];

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world');
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






