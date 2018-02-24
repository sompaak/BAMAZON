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

 

  connection.end();
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

function bamazon(){

  showProducts()
  inquirer.prompt([{
      name: 'query',
      type: 'text',
      message: 'Enter an id:'
    }]).then(function(user){
      console.log(user.query);
    })
  
}



















