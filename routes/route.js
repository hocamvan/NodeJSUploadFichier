const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');

router.get('/', (request, response) => {
  response.send('Tester post un fichier')
});

router.get('/monupload', (request, response) => {
  response.send(`<form method="POST" enctype="multipart/form-data" action="monupload">
    <input type="file" accept=".png" name="monfichier" multiple>
    <button> envoyer </button>
  </form>`);
});

router.post('/monupload', upload.array('monfichier'), function (req, res, next) {
  req.files.forEach(file => {
    if (file.size > 1024 * 1024 * 3) {
      res.status(400).send("File is too big!")
      return;
    };

    if (!file.mimetype.includes('image/png')) {
      res.status(400).send("File is not png!")
      return;
    };

    fs.rename(file.path, 'public/images/' + file.originalname, function (err) {
      if (err) {
        res.send('problème durant le déplacement');
      } else {
        res.send('Fichier uploadé avec succès');
      }
    });
  });

})

module.exports = router;
