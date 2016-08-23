

// GET item1  List

exports.list_banks = function(req, res){
  req.getConnection(function(err,connection){
      var query = connection.query('SELECT * FROM banks',function(err,rows) {
        if(err) {
          console.log("Error Selecting : %s ",err );
          return
        }
        res.render('banks', { title: 'Banks', banks : rows });
      });
  });
		
};


// POST new bank  creation form 
exports.save_banks = function(req, res){  
  // check if item exist 
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        if (input.operation == 'ins') {
          var data = {
            bank  : input.bank
          };
          var query = connection.query("INSERT INTO banks set ? ",data, function(err, rows) {
              if (err)
                  console.log("Error inserting : %s ",err );
              res.redirect('/banks');
          });
        } else {
        var myid = input.Code;
          var data = {
              bank  : input.bank
          };
          var query = connection.query("UPDATE banks set ? WHERE id = ? ",[data,myid], function(err, rows) {
              if (err)
                  console.log("Error updating : %s ",err );
              res.redirect('/banks');
            });
        }
    });
};
