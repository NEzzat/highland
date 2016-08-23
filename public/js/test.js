
$(function(){
  $('#search').on('click', function(e){
  if($('#orederno').val() != "") {
    var parameters = $('#orederno').val();
    $.get('/searching/', {"key":parameters}, function(data) {
      if (data.length > 0 ) {
        $('#operation').val('upd');  
        $('#myDate').val(data[0].trans_date)
//  Set Combos 
        $('select[name=supplier]').val(data[0].Supplier_ID);
        $('select[name=Item]').val(data[0].Item_ID);
        $('select[name=customer]').val(data[0].Customer_ID);
        $('.selectpicker').selectpicker('refresh');
        $('#qtyRCV').val(data[0].QTYReceived);
        $('#PURprice').val(data[0].PurchasePrice);
        $('#unit').val(data[0].Unit);        
        $('#SALprice').val(data[0].SalesPrice);

      } else {
        alert("Order Not Found")
      }
    //       $('#results').html(data);
    });
  };
  });
  $('#findSupplierPayment').on('click', function(e){
    if($('#payno').val() != "") {
      var parameters = $('#payno').val();
      $.get('/findSupplierPayment/', {"key":parameters}, function(data) {
        if (data.length > 0 ) {
          $('#operation').val('upd');  
          $('#myDate').val(data[0].paydate)
          //  Set Combos 
          $('select[name=supplier]').val(data[0].contact_id);
          $('select[name=bank]').val(data[0].bank_id);
          $('.selectpicker').selectpicker('refresh');
          $('#amount').val(data[0].payvalue);
          $('#chkno').val(data[0].chkno);
          $('#chkdate').val(data[0].chkdate);        
        } else {
          alert("Payment Not Found")
        };
      });
    } 
  });

// find Customer payment
  $('#findcollection').on('click', function(e){
    if($('#payno').val() != "") {
      var parameters = $('#payno').val();
      $.get('/findcollection/', {"key":parameters}, function(data) {
        if (data.length > 0 ) {
          $('#operation').val('upd');  
          $('#myDate').val(data[0].paydate)
          //  Set Combos 
          $('select[name=customer]').val(data[0].contact_id);
          $('select[name=bank]').val(data[0].bank_id);
          $('.selectpicker').selectpicker('refresh');
          $('#amount').val(data[0].payvalue);
          $('#chkno').val(data[0].chkno);
          $('#chkdate').val(data[0].chkdate);        
        } else {
          alert("Collection Not Found")
        };
      });
    } 
  });
});




//$('.selectpicker').selectpicker();


$(function() {

// Get Items 2 on Page 2
  $('#code1_2').on('change', function(){
    var selected = $(this).find("option:selected").val();
    $.get('/item2/table/', {"key":selected}, function(data) {
      var $table = $('#myTable');
      $table.bootstrapTable('load', data);
    });
  });

// Get Items 2 on Page 4
 $('#code1_4').on('change', function(){
   var selected = $(this).find("option:selected").val();
   $.get('/item2/list/', {"key":selected}, function(data) {
     $('#code2_4').empty();
     $('#code3_4').empty();
     $.each(data, function(number, item2) {
        if (item2.salesLevel == 'Yes') {
          $('#code2_4').append($('<option disabled="disabled">').text(item2.name).attr('value', item2.id) );
        } else {
          $('#code2_4').append($('<option>').text(item2.name).attr('value', item2.id) );
        };
     });
     $('#code2_4').selectpicker('refresh')
     $('#code2_4').selectpicker('render');
   });
 });


// Get Items 3 on Page 4
$('#code2_4').on('change', function(){
  var selected1 = $('#code1_4').find("option:selected").val();
  var selected2 = $(this).find("option:selected").val();
  $.get('/item3/list/', {"key1":selected1,"key2":selected2}, function(data) {
     $('#code3_4').empty();
     $.each(data, function(number, item3) {
        if (item3.salesLevel == 'Yes') {
          $('#code3_4').append($('<option disabled="disabled">').text(item3.name).attr('value', item3.id) );
        } else {
          $('#code3_4').append($('<option>').text(item3.name).attr('value', item3.id) );
        };
     });
     $('#code3_4').selectpicker('refresh')
     $('#code3_4').selectpicker('render');
  });
});


// Get Items 2 on Page 5
 $('#code1_5').on('change', function(){
   var selected = $(this).find("option:selected").val();
   $.get('/item2/list', {"key":selected}, function(data) {
     $('#code2_5').empty();
     $('#code3_5').empty();
     $('#code4_5').empty();
     $.each(data, function(number, item2) {
        if (item2.salesLevel == 'Yes') {
          $('#code2_5').append($('<option disabled="disabled">').text(item2.name).attr('value', item2.id) );
        } else {
          $('#code2_5').append($('<option>').text(item2.name).attr('value', item2.id) );
        };

     });
     $('#code2_5').selectpicker('refresh')
     $('#code2_5').selectpicker('render');
   });
 });


// Get Items 3 on Page 5
  $('#code2_5').on('change', function(){
    var selected1 = $('#code1_5').find("option:selected").val();
    var selected2 = $(this).find("option:selected").val();
    $.get('/item3/list', {"key1":selected1,"key2":selected2}, function(data) {
      $('#code3_5').empty();
      $('#code4_5').empty();
      $.each(data, function(number, item3) {
        if (item3.salesLevel == 'Yes') {
          $('#code3_5').append($('<option disabled="disabled">').text(item3.name).attr('value', item3.id) );
        } else {
          $('#code3_5').append($('<option>').text(item3.name).attr('value', item3.id) );
        };
      });
      $('#code3_5').selectpicker('refresh')
      $('#code3_5').selectpicker('render');
    });
  });

// // Get Items 4 on Page 5
  $('#code3_5').on('change', function(){
    var selected1 = $('#code1_5').find("option:selected").val();
    var selected2 = $('#code2_5').find("option:selected").val();
    var selected3 = $(this).find("option:selected").val();
    $.get('/item4/list', {"key1":selected1,"key2":selected2,"key3":selected3}, function(data) {
      $('#code4_5').empty();
      $.each(data, function(number, item4) {
        if (item4.salesLevel == 'Yes') {
          $('#code4_5').append($('<option disabled="disabled">').text(item4.name).attr('value', item4.id) );
        } else {
          $('#code4_5').append($('<option>').text(item4.name).attr('value', item4.id) );
        };
      });
      $('#code4_5').selectpicker('refresh')
      $('#code4_5').selectpicker('render');
    });
  });

// Get Items 5 on Page 5
  $('#code4_5').on('change', function(){
    var selected1 = $('#code1_5').find("option:selected").val();
    var selected2 = $('#code2_5').find("option:selected").val();
    var selected3 = $('#code3_5').find("option:selected").val();
    var selected4 = $(this).find("option:selected").val();
    $.get('/item5/table', {"key1":selected1,"key2":selected2,"key3":selected3,"key4":selected4}, function(data) {
      var $table = $('#myTable5');
      $table.bootstrapTable('load', data);
    });
  });




// Get Item 2 On Item Page 3
  $('#code1_3').on('change', function(){
    var selected = $(this).find("option:selected").val();
    $.get('/item2/list/', {"key":selected}, function(data) {
      $('#code2_3').empty();
      $.each(data, function(number, item2) {
        if (item2.salesLevel == 'Yes') {
          $('#code2_3').append($('<option disabled="disabled">').text(item2.name).attr('value', item2.id) );
        } else {
          $('#code2_3').append($('<option>').text(item2.name).attr('value', item2.id) );
        };
      });
      $('#code2_3').selectpicker('refresh')
      $('#code2_3').selectpicker('render');

    });
  });

// Get Items 3 on Page 3
  $('#code2_3').on('change', function(){
    var selected1 = $('#code1_3').find("option:selected").val();
    var selected2 = $(this).find("option:selected").val();
    $.get('/item3/table', {"key1":selected1,"key2":selected2}, function(data) {
      var $table = $('#myTable3');
      $table.bootstrapTable('load', data);
    });
  });

// Get Items 4 on Page 4
  $('#code3_4').on('change', function(){
    var selected1 = $('#code1_4').find("option:selected").val();
    var selected2 = $('#code2_4').find("option:selected").val();
    var selected3 = $(this).find("option:selected").val();
    $.get('/item4/table', {"key1":selected1,"key2":selected2,"key3":selected3}, function(data) {
      var $table = $('#myTable4');
      $table.bootstrapTable('load', data);
    });
  });

// // Get Items 2 on Sales Page
  $('#Item1').on('change', function(){
    $('#Item2').empty();
    $('#Item3').empty();
    $('#Item4').empty();
    $('#Item5').empty();
    $('.selectpicker').selectpicker('refresh');
    var selected = $(this).find("option:selected").val();
    $.get('/item2/list/', {"key":selected}, function(data) {
      if (data.length > 0) {
        $.each(data, function(number, item2) {
          $('#Item2').append($('<option>').text(item2.name).attr('value', item2.id));
        });
        $('#Item2').selectpicker('refresh')
        $('#Item2').selectpicker('render');
      };
    });
  });

// Get Items 3 on Sales Page
  $('#Item2').on('change', function(){
    $('#Item3').empty();
    $('#Item4').empty();
    $('#Item5').empty();
    $('.selectpicker').selectpicker('refresh');
    var selected1 = $('#Item1').find("option:selected").val();
    var selected2 = $(this).find("option:selected").val();
    $.get('/item3/list', {"key1":selected1, "key2":selected2 }, function(data) {
      if (data.length > 0) {
        $.each(data, function(number, item3) {
          $('#Item3').append($('<option>').text(item3.name).attr('value', item3.id));
        });
        $('#Item3').selectpicker('refresh')
        $('#Item3').selectpicker('render');
      };
    });
  });

// // Get Items 4 on Sales Page
  $('#Item3').on('change', function(){
    $('#Item4').empty();
    $('#Item5').empty();
    $('.selectpicker').selectpicker('refresh');
    var selected1 = $('#Item1').find("option:selected").val();
    var selected2 = $('#Item2').find("option:selected").val();
    var selected3 = $(this).find("option:selected").val();
    $.get('/item4/list', {"key1":selected1, "key2":selected2, "key3":selected3}, function(data) {
      if (data.length > 0) {
        $.each(data, function(number, item4) {
          $('#Item4').append($('<option>').text(item4.name).attr('value', item4.id));
        });
        $('#Item4').selectpicker('refresh')
        $('#Item4').selectpicker('render');
      };
    });
  });

// // Get Items 5 on Sales Page
  $('#Item4').on('change', function(){
    var selected1 = $('#Item1').find("option:selected").val();
    var selected2 = $('#Item2').find("option:selected").val();
    var selected3 = $('#Item3').find("option:selected").val();
    var selected4 = $(this).find("option:selected").val();
    $.get('/item5/list', {"key1":selected1, "key2":selected2, "key3":selected3, "key4":selected4}, function(data) {
      $('#Item5').empty();
      $.each(data, function(number, item5) {
        $('#Item5').append($('<option>').text(item5.name).attr('value', item5.id));
      });
      $('#Item5').selectpicker('refresh')
      $('#Item5').selectpicker('render');
    });
  });


});