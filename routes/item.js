//var mongoose = require( 'mongoose' ); 
//var items = mongoose.model( 'item' ); 


// GET item1  List
exports.list_item = function(req, res){
  req.getConnection(function(err,connection){
      var query = connection.query('SELECT * FROM item',function(err,rows) {
        if(err) {
          console.log("Error Selecting : %s ",err );
          return
        }
        res.render('item', { title: 'Paper Items', items : rows });
      });
  });
		
};


// POST new Item  creation form 
exports.save_item = function(req, res){  
  // check if item exist 
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        if (input.operation == 'ins') {
          var data = {
//            id    : input.Code1,
            name  : input.Item

          };
          var query = connection.query("INSERT INTO item set ? ",data, function(err, rows) {
              if (err)
                  console.log("Error inserting : %s ",err );
              res.redirect('/item');
          });
        } else {
        var myid = input.Code;
          var data = {
              name  : input.Item
          };
          var query = connection.query("UPDATE item set ? WHERE id = ? ",[data,myid], function(err, rows) {
              if (err)
                  console.log("Error updating : %s ",err );
              res.redirect('/item');
            });
        }
    });
};



