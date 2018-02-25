var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  bamazon();
  //connection.end();
});


function showProducts() {

  var table = new Table({
      head: ['id', 'product_name','department_name','price','stock_quantity']
  });  
  connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
            table.push([ res[i].id, 
                         res[i].product_name, 
                         res[i].department_name, 
                         res[i].price, 
                         res[i].stock_quantity 
                      ]);                
       }
      console.log(table.toString());
  });
}



function updateQuantity(prodId, qty){

  connection.query("select stock_quantity FROM products WHERE id = " + prodId, function(err, res) {

    var dbQty = res[0].stock_quantity;

    if (dbQty === 0){
      console.log ("product out of stock")
    }

    if (qty > dbQty && dbQty !=0){
      console.log("Asked qty more than in stock qty. But hey you got our entire stock")
      connection.query("update products set stock_quantity = 0 WHERE id = " + prodId )
    }

    if ( qty < dbQty){
      console.log("Ok. You get it")
      connection.query("update products set stock_quantity = " + (dbQty - qty) + " WHERE id = " + prodId )
    }

    else{

      console.log("Enjoy your purchase")
      connection.query("update products set stock_quantity = 0 WHERE id = " + prodId )
    }



    inquirer.prompt([
    {
      name:"confirmation",
      type:"text",
      message:"Items are on sale do u want take a look at more Items yes or no"
      
    }

    ]).then(function(inp){

      if(inp.confirmation === "yes"){
        bamazon()

      }

      else{
        connection.end()
      }





    })

   
    
    //showProducts();
    

  })
}

function bamazon(){
  var prodId = ""

  showProducts()
  inquirer.prompt([
    {
      name: 'query',
      type: 'text',
      message: 'Enter an id:'
    },
    {
      name:"amount",
      type:"text",
      message:"Enter a quantity"
    }

  ])


  .then(function(userInput){
      updateQuantity(userInput.query, userInput.amount);
      
    })

}





















