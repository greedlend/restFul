var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',	author:'Greedlend' });
});
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'index/about' });
  	// res.send('Hi, index/about');
});
//Routing for API
router.get('/api', function(req, res) {
  res.json({ message: 'This is our api!' });
});
/* DB test */
router.get('/userlist', function(req, res) {
    var db = req.db, name =[];
    var collection = db.get('usersCollection');
    collection.find({},{},function(e,docs){
    	var objKey = Object.keys(docs);
    	objKey.forEach(function(objectid){
	        var items = Object.keys(docs[objectid]);
	        items.forEach(function(itemkey) {
	          var itemvalue =docs[objectid][itemkey];
	          if(itemkey === "user"){
	          	name.push(itemvalue);
	          }
	          console.log(objectid+': '+itemkey+' = '+itemvalue);
	        });
      });
    	
        res.render('userlist', {
            "userlist" : docs,
            "username": name
        });
        // console.log(docs);
    });
});

module.exports = router;
