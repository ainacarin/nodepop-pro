var express = require('express');
var router = express.Router();

const Advertisement = require('../models/Advertisement');
const Tag = require('../models/Tag');

const imagesPath = 'images/';

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  try {
    res.locals.title = 'NODEPOP';
    
    const advertisementsResults = await Advertisement.find(); 

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

module.exports = router;
