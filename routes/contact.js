exports.list = function(req, res){
  	req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM contact_type',function(err,rows) {
            if(err)
                console.log("Error Selecting ContactType: %s ",err );
//            	return 
			var mysql = "Select contact.id,contact_type.id As id1,contact.name,contact.email,contact.telephone,contact.contact_persone,contact_type.name As name1,contact.open_balance_Credit,contact.open_balance_Debit,contact.open_balance_date From contact Inner Join contact_type On contact_type.id = contact.contact_type"
            var newquery = connection.query(mysql,function(err,list) {
				if(err)
                	console.log("Error Selecting Contact: %s ",err );
//            		return 
            	res.render('contact',{title:"Customers & Suppliers",contacttypes:rows,contacts:list});
        	});
        });
    });
  
};

// POST new user Contact form 
exports.save = function(req, res){  
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
    	if (input.operation == 'ins') {
        	var data = {
            	name    			: input.FullName,
            	email   			: input.Email,
            	telephone 			: input.Telephone,
            	contact_persone   	: input.ContactPersone,
            	contact_type   		: input.ContactType,
            	open_balance_credit : input.OpenBalCredit, 
            	open_balance_debit 	: input.OpenBalDebit,
            	balance_credit 		: 0, 
            	balance_debit 		: 0,
            	open_balance_date 	: input.OpenDate
        	};
        	var query = connection.query("INSERT INTO contact set ? ",data, function(err, rows) {
          	if (err)
              console.log("Error inserting : %s ",err );
          	res.redirect('/contact');
          
        	});
        } else {
        	var myid = input.id;
        	var data = {
            	name    			: input.FullName,
            	email   			: input.Email,
            	telephone 			: input.Telephone,
            	contact_persone   	: input.ContactPersone,
            	contact_type   		: input.ContactType,
            	open_balance_credit : input.OpenBalCredit, 
            	open_balance_debit 	: input.OpenBalDebit,
            	open_balance_date 	: input.OpenDate
        	};
        	var query = connection.query("UPDATE contact set ? WHERE id = ? ",[data,myid], function(err, rows) {
            if (err)
            	console.log("Error updating : %s ",err );
            res.redirect('/contact');
            });
   
        }
        
       // console.log(query.sql); get raw query
    
    });

};