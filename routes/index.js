var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session && req.session.user) {
		req.getConnection(function(err,connection){
			var query = connection.query('SELECT * FROM users where username = ? ', [req.session.user.username], function(err,myuser) {
        		if (!myuser) {
        			req.session.reset();
         	 		res.redirect('/login');
        		} else {
        			res.locals.user = myuser[0].username;
       				res.render('index', { title: 'Purchase & Sales' });
        		};
       	
	    	});
	    });
	} else {
		res.redirect('/login');
	};
});

module.exports = router;
