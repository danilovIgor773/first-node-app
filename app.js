const Logger = require('./logger');
const logger = new Logger();
const _ = require('underscore');

logger.on('messageLogged', (arg) => {
    console.log(`Listener called with args: ${JSON.stringify(arg)}`);    
});

logger.log("Here! Logger should be called!");

const result = _.contains([1, 2, 3], 3);

logger.log(`Result of _.contains underscore function is: ${result}`);


// emitter.on('messageLogged', (eventArgs) => {
//     logger.log(`Logger called: ${JSON.stringify(eventArgs)}`);
// });

// emitter.emit('messageLogged', {id:1, url: 'http://'});


