var express = require('express');
var router = express.Router();

var multer=require('multer');
var path=require('path');
var mime = require('mime');
var fs = require('fs');


var store=multer.diskStorage({
destination:function(req,file,cb){
  cb(null,'./uploads')
},
filename:function(req,file,cb)
  {
    cb(null,file.originalname)
  }
});


var upload=multer({storage:store}).single('file');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload',function(req,res,next){ 
  upload(req,res,function(err){
    if(err)
    {
     return  res.status(501).json({error:err});
    }
    return res.json({originalName:req.file.originalname,uploadName:req.file.filename});
  });

});

router.get('/download',function(req,res,next){ 
  console.log("Hello Frandss");
var file=path.join(__dirname,"../uploads") + "/app-debug.apk";

var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);


});




module.exports = router;
