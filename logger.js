// const EventEmitter = require('events');

// class Logger extends EventEmitter {
//     log (message){
//         console.log(`Logger output message: ${message}`);    
//         this.emit('messageLogged', {id:1, url: 'http://'});
//     }       
// };

function log (req, res, next) {
    console.log('Logging...');
    next(); //should be called cause we need to pass control to the next function - request pipline processing
};

module.exports = log;