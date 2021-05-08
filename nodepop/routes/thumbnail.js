
const cote = require('cote');

const requester = new cote.Requester({ name: 'Thumbnail client'});

const thumbnail = (originPath, filename, destPath) => {
 
    console.log('en requester');
    requester.send({
    type: 'thumbnail',
    originPath,
    filename,
    destPath
  }, result => {
      console.log('Client: thumbnail created: ', result);

  });
};

module.exports = thumbnail;