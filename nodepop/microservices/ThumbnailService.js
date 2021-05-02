'use strict';

const cote = require('cote');
const Jimp = require('jimp');


const responder = new cote.Responder({ name: 'Thumbnail Service' });

responder.on('thumbnail', (req, done) => {

    console.log(req);
    const { originPath, filename, destPath } = req;
    console.log('en responder', originPath, filename,destPath);

    // done(`hecho${originPath} ${filename} ${destPath}`);

    Jimp.read(`${originPath}${filename}`, (error, image) => {
        if (error) {
            done(error);
        } else {
            image
            .resize(100, 100)
            .write(`${destPath}${filename}-thumbnail.jpg`);
            done(`${destPath}${filename}-thumbnail.jpg`);
        }
    });

});