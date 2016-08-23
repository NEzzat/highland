// GET users  List

exports.list_users = function(req, res){
  req.getConnection(function(err,connection){
      var query = connection.query('SELECT * FROM users',function(err,rows) {
        if(err) {
          console.log("Error Selecting : %s ",err );
          return
        }
        res.render('users', { title: 'Users', users : rows });
      });
  });
		
};

exports.user_login = function(req, res){
  	req.getConnection(function(err,connection){
		var input = JSON.parse(JSON.stringify(req.body));
      	var query = connection.query('SELECT * FROM users where username = ? ', [input.username], function(err,myuser) {
        	if (!myuser[0]) {
          		res.render('login' , {error :'Invalid User Name or Password'});
        	} else {
        		if (input.password === myuser[0].password) {
        			req.session.user = myuser[0]
		        	res.redirect('/');
        		} else {
        			res.render('login' , {error :'Invalid User Name or Password'});
        		};

        	};

        	
      	});
  	});
		
};