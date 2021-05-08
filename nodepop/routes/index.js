var express = require('express');
var router = express.Router();

const Advertisement = require('../models/Advertisement');

const imagesPath = 'images/';

/** 
 * List all advertisements - Home page
 * GET /
 */
router.get('/', async function(req, res, next) {
  try {
    res.locals.title = 'NODEPOP';
    res.locals.subtitle = res.__('¡Compra o vende!');

    const advertisementsResults = await Advertisement.list(req.query);
    advertisementsResults.forEach(advertisement => {
      if(advertisement.image) { 
        advertisement.image = imagesPath.concat(advertisement.image);
      }
    });

    res.locals.advertisements = advertisementsResults;
    
    res.render('index');
  } catch (error) {
    next(error);
  }
});

/** 
 * TAGS List
 * GET /tags
 */
router.get('/tags', async function(req, res, next) {
  try {
    res.locals.title = 'NODEPOP';
    res.locals.subtitle = res.__('TAGS disponibles');

    const tagsResults = await Advertisement.distinct("tags");
    
    res.locals.tags = tagsResults;
    
    res.render('tags');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
