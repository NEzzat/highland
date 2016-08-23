//var mongoose = require( 'mongoose' ); 
//var customers = mongoose.model( 'customers' ); 

exports.list = function(req, res){
  	req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM customer',function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('customer',{title:"Customers List",customers:rows});
        });
    });
  
};

exports.new = function(req, res){  
	res.render('customer_add', { title: 'Add Customer' });
};

// Get Customer and open the Edit Page
exports.edit = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM customer WHERE id = ?',[id],function(err,rows){
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('customer_edit',{title:"Edit Customer ",customers:rows});
         });
    }); 
}; 

// Save the updates to the database
exports.save_edit = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var data = {
            name    			: input.FullName,
            address 			: input.address,
            email   			: input.Email,
            contact1Name   		: input.contact1Name,
            Contact1Telephone   : input.Contact1Telephone, 
            contact2Name   		: input.contact2Name,
            Contact2Telephone   : input.Contact2Telephone 
        };
        connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows) {
          	if (err)
              	console.log("Error Updating : %s ",err );
         
          	res.redirect('/customers');
          
        });
    });
}




// POST new user creation form 
exports.save = function(req, res){  
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var data = {
            
            name    			: input.FullName,
            address 			: input.address,
            email   			: input.Email,
            contact1Name   		: input.contact1Name,
            Contact1Telephone   : input.Contact1Telephone, 
            contact2Name   		: input.contact2Name,
            Contact2Telephone   : input.Contact2Telephone 
       
        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows) {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/customers');
          
        });
        
       // console.log(query.sql); get raw query
    
    });

};

exports.delete = function(req,res){
     var id = req.params.id;
     req.getConnection(function (err, connection) {
        connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows) {
             if(err)
                 console.log("Error deleting : %s ",err );
             res.redirect('/customers');
        });
     });
};
