const authentication = (req, res, next) => {
    console.log('Authenticating...');
    next(); //should be called cause we need to pass control to the next function - request pipline processing
};

module.exports = authentication;