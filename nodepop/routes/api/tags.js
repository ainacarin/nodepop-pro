var express = require('express');
const Advertisement = require('../../models/Advertisement');
var router = express.Router();

/* GET /api/tags */
router.get('/', async function(req, res, next) {
    try{
        // const resultado = await Tag.find();
        const resultado = await Advertisement.distinct("tags");
        res.json(resultado);
    }catch(err){
        next(err);
    }
});


/* POST /api/tags */
// router.post('/', async (req, res, next) => {
//     try {
//         const tagData = req.body;
//         const tag = new Tag(tagData);
//         tag.name = tag.name.toLowerCase();
//         const tagCreate = await tag.save(); 
        
//         res.status(201).json({ result: tagCreate });
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;