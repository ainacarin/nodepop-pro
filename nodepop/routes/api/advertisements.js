var express = require('express');
const Advertisement = require('../../models/Advertisement');
var router = express.Router();

/**Midleware Auth JWT */
const authJWT = require('../../lib/authJWT');

/* GET /api/advertisements */
router.get('/', authJWT, async function(req, res, next) {
    try{
        const result = await Advertisement.list(req.query);

        res.json(result);
    }catch(err){
        next(err);
    }
    
});


/* POST /api/advertisements */
router.post('/', async (req, res, next) => {
    try {
        const advertisementData = req.body;
        advertisementData.name = advertisementData.name.toLowerCase();
        advertisementData.image = advertisementData.name.replace(/ /g,'');
        const advertisement = new Advertisement(advertisementData);

        const advertisementCreate = await advertisement.save(); 
        
        res.status(201).json({ result: advertisementCreate });
    } catch (error) {
        next(error);
    }
});

module.exports = router;