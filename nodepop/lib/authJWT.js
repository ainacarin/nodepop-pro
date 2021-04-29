'use strict';

const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    
    const jwtToken = req.get('Authorization') || req.query.token || req.body.token;

    if(!jwtToken) {
        const error = new Error('no token provided');
        error.status = 401;
        next(error);
        return;
    } 
    jwt.verify(jwtToken, '20+(gokuvegeta)dragon-ball+21', (error, payloadToken) => {
        if(error) {
            error.status = 401;
            next(error);
            return;
        } 
        // mando el id del usuario en una propiedad que yo invento en la req para el siguiente router manejador
        req.apiAuthUserId = payloadToken._id;
        next();
    })


};

