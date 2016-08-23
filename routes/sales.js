

exports.search = function(req, res){
    var selected = req.query.key;
    console.log(selected)
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM transactions where documentno = ?', [selected],function(err,rows) {
          if(err) {
              console.log("Error Selecting : %s ",err );
              return
          }
          res.send(rows)
        });
    });
};

/* test here */

exports.showheader = function(req, res){
  	req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM contact where contact_type = 4 ',function(err,rows) {
            if(err)
                console.log("Error Selecting customers in sales page : %s ",err );
            var query = connection.query('SELECT * FROM contact where contact_type = 5 ',function(err,docs) {
              if(err)
                  console.log("Error Selecting Suppliers in sales page : %s ",err );
              var query = connection.query('SELECT * FROM item ',function(err,items) {
                if(err)
                    console.log("Error Selecting Items in sales page : %s ",err );
                res.render('transactions', { title: 'Sales Transaction', customers: rows ,suppliers : docs, items : items});            

              });
            });
        });
    });
};



// POST save sales transaction form 
exports.savehead = function(req, res){  
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function (err, connection) {
    if (input.operation == 'upd') {
      var myid = input.orederno;
      var SupplierDebit = input.qtyRCV * input.PURprice;
      var ClientDebit = input.qtyRCV * input.SALprice;
      connection.beginTransaction(function(err) {
        connection.query("Delete from transactions where documentno = ? ",[myid], function(err, result) {
          if (err)
            console.log("Error Delete Sales Transaction: %s ",err );
          // Update Supplier Credit Balance
          connection.query("Update contact set balance_Credit = balance_Credit - " + SupplierDebit + " where id = ? ",[input.supplier], function(err, rows) {
            if (err) {
              connection.rollback(function() {
                console.log("Error Updating Credit Value For Supplier: %s ",err );
              });
            };
            // Update Customer Debit Balance
            connection.query("Update contact set balance_Debit = balance_Debit - " + ClientDebit + " where id = ? ",[input.customer], function(err, rows) {
              if (err) {
                connection.rollback(function() {
                  console.log("Error Updating Debit Value For Customer: %s ",err );
                });
              };
              connection.commit(function(err) {
                if (err)
                  console.log("Error inserting : %s ",err );
              res.redirect("/sales")
              });
            });
          });
        });
      });
    } else if (input.operation == 'ins' && input.save == 'save') {;
      var data = {
        trans_date      : input.myDate, 
        supplier_id  	  : input.supplier,
        item_id         : input.Item,
        QTYReceived     : input.qtyRCV,
        PurchasePrice   : input.PURprice,
        Customer_ID     : input.customer,
        SalesPrice      : input.SALprice,
        DeliveredQTY    : input.qtyRCV,
        Unit            : input.unit
      };
      var SupplierDebit = input.qtyRCV * input.PURprice;
      var ClientDebit = input.qtyRCV * input.SALprice;
      connection.beginTransaction(function(err) {
        connection.query("INSERT INTO transactions set ? ",data, function(err, result) {
          if (err)
            console.log("Error inserting Sales Transactions: %s ",err );

          res.locals.orderno = result.insertId;
          connection.query("Update contact set balance_Credit = balance_Credit + " + SupplierDebit + " where id = ? ",[input.supplier], function(err, rows) {
            if (err)
              console.log("Error Updating Cridet Value for Supplier : %s ",err );
          //   throw err;
          // Update Customer Debit Balance
            connection.query("Update contact set balance_Debit = balance_Debit + " + ClientDebit + " where id = ? ",[input.customer], function(err, rows) {
              if (err) {
                connection.rollback(function() {
                  console.log("Error Updating Debit Value For Customer: %s ",err );
                });
              };
              connection.commit(function(err) {
                if (err)
                  console.log("Error inserting : %s ",err );
                var string = "Data Saved, Transaction Number = " + res.locals.orderno + "  ";
                console.log(string)
                res.render('myview', { title : string});
              });
            });
          });
        });
      });
    };
  });
};

