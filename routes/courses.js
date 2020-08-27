const express = require('express');
const router = express.Router();
const Joi = require('joi');

const coursesData = [
    {id: '1', name: 'JS course'},
    {id: '2', name: 'React course'},
    {id: '3', name: 'Css course'}
];

router.get('/', (req, res) => {
    res.send(coursesData);
});

router.get('/:id', (req, res) => {
    const courseById = coursesData.find(course => course.id === req.params.id);
    if(!courseById) res.status(404).send('The course with given id is not found');
    res.send(courseById);
});

router.post('/', (req, res) => { //!!Always validate user input
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
// router.get('/api/posts/:id', (req, res) => {
//     res.send(`${req.params.id}`);
// });


// router.get('/api/photoes/:year/:month', (req, res) => {
//     res.send(req.params);
// });

// router.get('/api/photoes', (req, res) => {
//     res.send(req.query);
// });

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;