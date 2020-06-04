const EventEmitter = require('events');

class Logger extends EventEmitter {
    log (message){
        console.log(`Logger output message: ${message}`);    
        this.emit('messageLogged', {id:1, url: 'http://'});
    }       
};


module.exports = Logger;