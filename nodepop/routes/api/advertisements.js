var express = require('express');
const multer = require('multer');
const Advertisement = require('../../models/Advertisement');
var router = express.Router();
const upload = multer({ dest: './public/images/' })

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
router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        const advertisementData = req.body;
        if(req.file) {
            advertisementData.image = req.file.filename;
        } else{
            advertisementData.image = '';
        }
        advertisementData.name = advertisementData.name.toLowerCase();
        const advertisement = new Advertisement(advertisementData);

        const advertisementCreate = await advertisement.save(); 
        
        res.status(201).json({ result: advertisementCreate });
    } catch (error) {
        next(error);
    }
});

module.exports = router;