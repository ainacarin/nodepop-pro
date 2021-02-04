var express = require('express');
const Advertisement = require('../../models/Advertisement');
var router = express.Router();

/* GET /api/tags */
router.get('/', async function(req, res, next) {
    try{
        const resultado = await Advertisement.distinct("tags");
        res.json(resultado);
    }catch(err){
        next(err);
    }
});

module.exports = router;