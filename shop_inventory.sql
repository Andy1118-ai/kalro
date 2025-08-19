-- Active: 1744202777209@@127.0.0.1@3306@shop_inventory
-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 23, 2025 at 10:46 AM
-- Server version: 5.7.36
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop_inventory`
--

-- Step 1: Verify the connection
SELECT 1;

-- Step 2: Select the database
USE shop_inventory;

-- Step 3: Check if the database is selected
SELECT DATABASE() AS CurrentDatabase;

-- Step 4: Perform a simple query to test
SELECT * FROM customer LIMIT 5;

-- Step 5: Test a sample INSERT operation
INSERT INTO customer (fullName, email, mobile, address, district) 
VALUES ('John Doe', 'john.doe@example.com', 1234567890, '123 Main Street', 'Colombo');

-- Step 6: Test a sample UPDATE operation
UPDATE customer 
SET email = 'updated.email@example.com' 
WHERE fullName = 'John Doe';

-- Step 7: Test a sample DELETE operation
DELETE FROM customer 
WHERE fullName = 'John Doe';

-- Step 8: Test a JOIN query (e.g., sales with customer details)
SELECT sale.saleID, sale.itemName, sale.quantity, customer.fullName, customer.email 
FROM sale 
JOIN customer ON sale.customerID = customer.customerID;

-- Step 9: Add indexes to frequently queried columns
CREATE INDEX idx_customer_email ON customer (email);
CREATE INDEX idx_item_itemNumber ON item (itemNumber);
CREATE INDEX idx_sale_customerID ON sale (customerID);

-- Step 10: Add foreign key constraints
ALTER TABLE sale 
ADD CONSTRAINT fk_sale_customer FOREIGN KEY (customerID) REFERENCES customer(customerID);

ALTER TABLE purchase 
ADD CONSTRAINT fk_purchase_vendor FOREIGN KEY (vendorID) REFERENCES vendor(vendorID);

-- Step 11: Create views for commonly used queries
CREATE VIEW customer_sales AS
SELECT sale.saleID, sale.itemName, sale.quantity, customer.fullName, customer.email 
FROM sale 
JOIN customer ON sale.customerID = customer.customerID;

CREATE VIEW vendor_purchases AS
SELECT purchase.purchaseID, purchase.itemName, purchase.quantity, vendor.fullName AS vendorName 
FROM purchase 
JOIN vendor ON purchase.vendorID = vendor.vendorID;

-- Step 12: Add triggers for automation
DELIMITER $$

-- Trigger to update stock after a sale
CREATE TRIGGER after_sale_update_stock 
AFTER INSERT ON sale
FOR EACH ROW
BEGIN
  UPDATE item 
  SET stock = stock - NEW.quantity 
  WHERE itemNumber = NEW.itemNumber;
END$$

-- Trigger to update stock after a purchase
CREATE TRIGGER after_purchase_update_stock 
AFTER INSERT ON purchase
FOR EACH ROW
BEGIN
  UPDATE item 
  SET stock = stock + NEW.quantity 
  WHERE itemNumber = NEW.itemNumber;
END$$

DELIMITER ;

-- Step 13: Backup the database (this step is manual, use mysqldump or phpMyAdmin)

-- Step 14: Test edge cases (this step is manual, simulate edge cases in your application)

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` int(11) NOT NULL,
  `phone2` int(11) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `district` varchar(30) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customerID`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customerID`, `fullName`, `email`, `mobile`, `phone2`, `address`, `address2`, `city`, `district`, `status`, `createdOn`) VALUES
(4, 'Bill Gates', 'bill@microsoft.com', 993737, 772484884, '45, Palo Alto House, Marine Drive', 'South Carolina', 'Microsoft', 'Kurunegala', 'Active', '2018-04-30 15:14:02');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `productID` int(11) NOT NULL AUTO_INCREMENT,
  `itemNumber` varchar(255) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `discount` float NOT NULL DEFAULT '0',
  `stock` int(11) NOT NULL DEFAULT '0',
  `unitPrice` float NOT NULL DEFAULT '0',
  `imageURL` varchar(255) NOT NULL DEFAULT 'imageNotAvailable.jpg',
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `description` text NOT NULL,
  PRIMARY KEY (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`productID`, `itemNumber`, `itemName`, `discount`, `stock`, `unitPrice`, `imageURL`, `status`, `description`) VALUES
(50, '001', 'Maize', 5, 1200, 50, '1738175531_240_F_422113904_bNpAne1sVQvRiwP4ZRQYWOamV0DGEirf.jpg', 'Active', '');

-- --------------------------------------------------------

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
CREATE TABLE IF NOT EXISTS `purchase` (
  `purchaseID` int(11) NOT NULL AUTO_INCREMENT,
  `itemNumber` varchar(255) NOT NULL,
  `purchaseDate` date NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `unitPrice` float NOT NULL DEFAULT '0',
  `quantity` int(11) NOT NULL DEFAULT '0',
  `vendorName` varchar(255) NOT NULL DEFAULT 'Test Vendor',
  `vendorID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`purchaseID`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchase`
--

INSERT INTO `purchase` (`purchaseID`, `itemNumber`, `purchaseDate`, `itemName`, `unitPrice`, `quantity`, `vendorName`, `vendorID`) VALUES
(53, '001', '2018-05-24', 'Maize', 50, 200, 'ABC Company', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
CREATE TABLE IF NOT EXISTS `sale` (
  `saleID` int(11) NOT NULL AUTO_INCREMENT,
  `itemNumber` varchar(255) NOT NULL,
  `customerID` int(11) NOT NULL,
  `customerName` varchar(255) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `saleDate` date NOT NULL,
  `discount` float NOT NULL DEFAULT '0',
  `quantity` int(11) NOT NULL DEFAULT '0',
  `unitPrice` float(10,0) NOT NULL DEFAULT '0',
  PRIMARY KEY (`saleID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sale`
--

INSERT INTO `sale` (`saleID`, `itemNumber`, `customerID`, `customerName`, `itemName`, `saleDate`, `discount`, `quantity`, `unitPrice`) VALUES
(1, '3', 4, 'Bill Gates', 'Office Bag', '2018-05-24', 5, 2, 1300);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `fullName`, `username`, `password`, `status`) VALUES
(5, 'Guest', 'guest', '81dc9bdb52d04dc20036dbd8313ed055', 'Active'),
(6, 'a', 'a', '0cc175b9c0f1b6a831c399e269772661', 'Active'),
(7, 'admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
CREATE TABLE IF NOT EXISTS `vendor` (
  `vendorID` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` int(11) NOT NULL,
  `phone2` int(11) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `district` varchar(30) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`vendorID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`vendorID`, `fullName`, `email`, `mobile`, `phone2`, `address`, `address2`, `city`, `district`, `status`, `createdOn`) VALUES
(1, 'ABC Company', '', 2343567, 0, '80, Ground Floor, ABC Shopping Complex', '46th Avenue', 'Kolpetty', 'Colombo', 'Active', '2018-05-05 05:48:44');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
CREATE TABLE IF NOT EXISTS `staff` (
  `staffID` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` int(11) NOT NULL,
  `phone2` int(11) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `district` varchar(30) NOT NULL,
  `role` varchar(50) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`staffID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`fullName`, `email`, `mobile`, `address`, `district`, `role`, `status`) 
VALUES 
('Alice Johnson', 'alice.johnson@example.com', 9876543210, '456 Elm Street', 'Colombo', 'Manager', 'Active'),
('Bob Smith', 'bob.smith@example.com', 8765432109, '789 Pine Avenue', 'Galle', 'Cashier', 'Active'),
('Charlie Brown', 'charlie.brown@example.com', 7654321098, '123 Oak Street', 'Kandy', 'Sales Assistant', 'Active'),
('Diana Prince', 'diana.prince@example.com', 6543210987, '321 Maple Avenue', 'Jaffna', 'Inventory Manager', 'Active'),
('Eve Adams', 'eve.adams@example.com', 5432109876, '987 Birch Lane', 'Matara', 'Accountant', 'Active'),
('James Mwangi', 'james.mwangi@example.com', 720123456, '123 Nairobi Street', 'Nairobi', 'Manager', 'Active'),
('Mary Wanjiku', 'mary.wanjiku@example.com', 721234567, '456 Mombasa Road', 'Mombasa', 'Cashier', 'Active'),
('John Kamau', 'john.kamau@example.com', 722345678, '789 Kisumu Avenue', 'Kisumu', 'Sales Assistant', 'Active'),
('Grace Njeri', 'grace.njeri@example.com', 723456789, '321 Eldoret Lane', 'Eldoret', 'Inventory Manager', 'Active'),
('Peter Otieno', 'peter.otieno@example.com', 724567890, '987 Nakuru Drive', 'Nakuru', 'Accountant', 'Active'),
('Lucy Achieng', 'lucy.achieng@example.com', 725678901, '654 Thika Road', 'Thika', 'Supervisor', 'Active'),
('David Ochieng', 'david.ochieng@example.com', 726789012, '432 Machakos Street', 'Machakos', 'Technician', 'Active'),
('Jane Wambui', 'jane.wambui@example.com', 727890123, '876 Nyeri Avenue', 'Nyeri', 'HR Manager', 'Active'),
('Samuel Kiptoo', 'samuel.kiptoo@example.com', 728901234, '543 Kericho Lane', 'Kericho', 'Logistics Manager', 'Active'),
('Esther Chebet', 'esther.chebet@example.com', 729012345, '210 Bomet Road', 'Bomet', 'Procurement Officer', 'Active');

-- Clear existing data from all tables
DELETE FROM customer;
DELETE FROM item;
DELETE FROM purchase;
DELETE FROM sale;
DELETE FROM user;
DELETE FROM vendor;

-- Reset data for testing
INSERT INTO `customer` (`fullName`, `email`, `mobile`, `address`, `district`) 
VALUES ('John Doe', 'john.doe@example.com', 1234567890, '123 Main Street', 'Colombo');

INSERT INTO `item` (`itemNumber`, `itemName`, `discount`, `stock`, `unitPrice`, `description`) 
VALUES ('001', 'Maize', 5, 1200, 50, 'Sample description');

INSERT INTO `purchase` (`itemNumber`, `purchaseDate`, `itemName`, `unitPrice`, `quantity`, `vendorName`, `vendorID`) 
VALUES ('001', '2025-03-23', 'Maize', 50, 200, 'ABC Company', 1);

INSERT INTO `sale` (`itemNumber`, `customerID`, `customerName`, `itemName`, `saleDate`, `discount`, `quantity`, `unitPrice`) 
VALUES ('001', 1, 'John Doe', 'Maize', '2025-03-23', 5, 2, 50);

INSERT INTO `user` (`fullName`, `username`, `password`, `status`) 
VALUES ('Admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'Active');

INSERT INTO `vendor` (`fullName`, `email`, `mobile`, `address`, `district`) 
VALUES ('ABC Company', 'abc@example.com', 2343567, '80, Ground Floor, ABC Shopping Complex', 'Colombo');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
