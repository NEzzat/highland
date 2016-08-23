
// Search Supplier Payment
exports.findsupplierpayment = function(req, res){
    var selected = req.query.key;
    console.log(selected)
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM supplierpayment where id = ?', [selected],function(err,rows) {
          if(err) {
              console.log("Error Finding Supplier Payment : %s ",err );
              return
          }
          res.send(rows)
        });
    });
};

// Search Customer Payment
exports.findcollection = function(req, res){
    var selected = req.query.key;
    console.log(selected)
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM customercollection where id = ?', [selected],function(err,rows) {
          if(err) {
              console.log("Error Finding Customer Payment : %s ",err );
              return
          }
          res.send(rows)
        });
    });
};




// Show Supplier Payment Form
exports.supplierpayment = function(req, res){
  req.getConnection(function(err,connection){
      var query = connection.query('SELECT * FROM contact where contact_type = 5',function(err,rows) {
        if(err) {
          console.log("Error Selecting : %s ",err );
          return
        };
        var query = connection.query('SELECT * FROM banks ',function(err,docs) {
          if(err) {
            console.log("Error Selecting : %s ",err );
            return
          };
          res.render('pay', { title: 'Supplier Payment', suppliers : rows , banks : docs});
        });

      });
  });
		
};

// POST save Payment to supplier
exports.savpay = function(req, res){  
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function (err, connection) {
    if (input.operation == 'upd') {
      var myid = input.payno;
      connection.beginTransaction(function(err) {
        connection.query("Delete from supplierpayment where id = ? ",[myid], function(err, result) {
          if (err)
              connection.rollback(function() {
              console.log("Error Delete Supplier Payment: %s ",err );
              });
          // Update Supplier Credit Balance
          connection.query("Update contact set balance_Debit = balance_Debit - " + input.amount + " where id = ? ",[input.supplier], function(err, rows) {
            if (err) {
              connection.rollback(function() {
              console.log("Error Updating Debit Value For Supplier: %s ",err );
              });
            };
            connection.commit(function(err) {
              if (err)
                console.log("Error inserting : %s ",err );
              res.redirect("/supplier")
            });
          });
        });
      });
    } else if (input.operation == 'ins' && input.save == 'save') {;
      var data = {
        contact_id      : input.supplier,
        paydate         : input.myDate, 
        payvalue        : input.amount,
        chkno           : input.chkno,
        chkdate         : input.chkdate,
        bank_ID         : input.bank
      };
      connection.beginTransaction(function(err) {
        connection.query("INSERT INTO supplierpayment set ? ",data, function(err, result) {
          if (err)
              connection.rollback(function() {
                console.log("Error inserting Supplier Payment: %s ",err );
              });
          res.locals.orderno = result.insertId;
          connection.query("Update contact set balance_Debit = balance_Debit + " + data.payvalue + " where id = ? ",[input.supplier], function(err, rows) {
            if (err)
              connection.rollback(function() {
                console.log("Error Updating Debit Value For Supplier: %s ",err );
              });
            connection.commit(function(err) {
              if (err)
                console.log("Error inserting : %s ",err );
              var string = "Data Saved, Transaction Number = " + res.locals.orderno + "  ";
              res.render('myview', { title : string});
            });
          });
        });
      });
    };
  });
};

// Show Customer Collection Form
exports.showcollection = function(req, res){
  req.getConnection(function(err,connection){
      var query = connection.query('SELECT * FROM contact where contact_type = 4',function(err,rows) {
        if(err) {
          console.log("Error Selecting : %s ",err );
          return
        };
        var query = connection.query('SELECT * FROM banks ',function(err,docs) {
          if(err) {
            console.log("Error Selecting : %s ",err );
            return
          };
          res.render('collect', { title: 'Customer Collection', customers : rows , banks : docs});
        });

      });
  });
    
};

//customercollection

// POST save collection from customer
exports.savepay = function(req, res){  
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function (err, connection) {
    if (input.operation == 'upd') {
      var myid = input.payno;
      connection.beginTransaction(function(err) {
        connection.query("Delete from customercollection where id = ? ",[myid], function(err, result) {
          if (err)
              connection.rollback(function() {
              console.log("Error Delete Customer Collection: %s ",err );
              });
          // Update Supplier Credit Balance
          connection.query("Update contact set balance_Credit = balance_Credit - " + input.amount + " where id = ? ",[input.customer], function(err, rows) {
            if (err) {
              connection.rollback(function() {
              console.log("Error Updating Credit Value For Customer: %s ",err );
              });
            };
            connection.commit(function(err) {
              if (err)
                console.log("Error inserting : %s ",err );
              res.redirect("/collection/")
            });
          });
        });
      });
    } else if (input.operation == 'ins' && input.save == 'save') {;
      var data = {
        contact_id      : input.customer,
        paydate         : input.myDate, 
        payvalue        : input.amount,
        chkno           : input.chkno,
        chkdate         : input.chkdate,
        bank_ID         : input.bank
      };
      connection.beginTransaction(function(err) {
        connection.query("INSERT INTO customercollection set ? ",data, function(err, result) {
          if (err)
              connection.rollback(function() {
                console.log("Error inserting Customer Collection: %s ",err );
              });
          res.locals.orderno = result.insertId;
          connection.query("Update contact set balance_Credit = balance_Credit + " + data.payvalue + " where id = ? ",[input.customer], function(err, rows) {
            if (err)
              connection.rollback(function() {
                console.log("Error Updating Credit Value For Customer: %s ",err );
              });
            connection.commit(function(err) {
              if (err)
                console.log("Error inserting : %s ",err );
              var string = "Data Saved, Transaction Number = " + res.locals.orderno + "  ";
              res.render('myview', { title : string});
            });
          });
        });
      });
    };
  });
};