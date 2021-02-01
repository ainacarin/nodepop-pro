var express = require('express');
const Advertisement = require('../../models/Advertisement');
var router = express.Router();

/* GET /api/advertisements */
router.get('/', async function(req, res, next) {
    try{
        const resultado = await Advertisement.find();
        res.json(resultado);
        //throw new Error('fallo intencionado'); //comentar la línea anterior
    }catch(err){
        next(err);
    }
    
});


/* POST /api/advertisements */
router.post('/', async (req, res, next) => {
    try {
        const advertisementData = req.body;
        const advertisement = new Advertisement(advertisementData);

        const advertisementCreate = await advertisement.save(); 
        
        res.status(201).json({ result: advertisementCreate });
    } catch (error) {
        next(error);
    }
});

module.exports = router;