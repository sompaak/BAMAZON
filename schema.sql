DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	
	id INT NOT NULL AUTO_INCREMENT,

	product_name VARCHAR(100),

	department_name VARCHAR(100)

	price INT,

	stock_quantity INT,

	PRIMARY KEY(id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUES ("Uncharted 4", "video-games", 40,3),("Inception", "movies", 10,20),

		("macbookPro", "electronics", 1500,12),("lg-tv", "electronics", 2000,5),

		("desk", "furniture", 500,4),("jeans", "apparel",30,7),

		("IMAC-Pro", "electronics", 5000,3),("Microsoft Surface studio", "electronics", 3000,6),

		("magic mouse", "electronics", 60,10),("Monopoly", "kids", 20,2);

