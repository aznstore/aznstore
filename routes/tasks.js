var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://test:test@ds117878.mlab.com:17878/bobashop',['boba']);

// Get ALL tasks
router.get('/tasks', function(req, res, next){
	db.boba.find(function(err, bobas){
		if(err){
			res.send(err);
		}
		res.json(bobas);
	});
});

// Get Single Tasks
router.get('/task/:id', function(req, res, next){
	db.boba.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, boba){
		if(err){
			res.send(err);
		}
		res.json(boba);
	});
});

//Save Task
router.post('/task', function(req, res, next){
	var boba = req.body;
	if(!boba.name || (boba.isDone + '')){
		res.status(400);
		res.json({
			"error":"Bad Data"
		});
	} else {
		db.boba.save(boba, function(err, boba){
			if(err){
			res.send(err);
		}
		});
		res.json(boba);
	}
});

// Delete Task
router.delete('/task/:id', function(req, res, next){
	db.boba.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, boba){
		if(err){
			res.send(err);
		}
		res.json(boba);
	});
});

// Update Task
router.put('/task/:id', function(req, res, next){
	var boba = req.body;
	var updBoba = {};

	if(boba.isDone){
		updBoba.isDone = boba.isDone;
	}

	if(boba.title){
		updBoba.title = boba.title;
	}

	if(!updBoba){
		res.status(400);
		res.json({
			"error":"Bad Data"
		});
	} else {
		db.boba.update({_id: mongojs.ObjectId(req.params.id)}, updBoba, {}, function(err, boba){
		if(err){
			res.send(err);
		}
		res.json(boba);
	});
	}

});




module.exports = router;