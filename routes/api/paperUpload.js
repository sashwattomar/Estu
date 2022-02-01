// const express = require('express');
// const router = express.Router();
// //CREATING A DOCUMENT REQUIRES THE USE OF MODEL THUS IMPORTING USERS MODEL
// const fileUpload = require('express-fileupload');
// const app = express();
// app.use(fileUpload());
// const PaperModel = require('../../model/Papers');
// router.post('/upload', async (req, res) => {
//   console.log('reached');
//   if (req.files == null) {
//     return res.status(400).json({msg: 'no file uploaded'});
//   }

//   const file = req.files.file;
//   file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send(err);
//     }
//     let paperObj = {
//       paperset: file.name,
//     };

//     let paper = new PaperModel(paperObj);
//     const allpapers = PaperModel.find();
//     paper.save();

//     res.json(allpapers);
//   });
// });
// module.exports = router;
