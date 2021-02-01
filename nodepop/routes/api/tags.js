var express = require('express');
const Tag = require('../../models/Tag');
var router = express.Router();

/* GET /api/tags */
router.get('/', async function(req, res, next) {
    try{
        const resultado = await Tag.find();
        res.json(resultado);
    }catch(err){
        next(err);
    }
});


/* POST /api/tags */
router.post('/', async (req, res, next) => {
    try {
        const tagData = req.body;
        const tag = new Tag(tagData);

        const tagCreate = await tag.save(); 
        
        res.status(201).json({ result: tagCreate });
    } catch (error) {
        next(error);
    }
});

module.exports = router;