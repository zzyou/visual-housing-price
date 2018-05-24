# Visual Housing Price
Final Project at Techtonica

### [Data](https://www.fhfa.gov/KeyTopics/pages/house-price-index.aspx)
#### Housing Price Index (HPI)
> The HPI is a broad measure of the movement of single-family house prices in the United States. The HPI is a weighted, repeat-sales index, meaning that it measures average price changes in repeat sales or refinancings on the same properties.  This information is obtained by reviewing repeat mortgage transactions on single-family properties whose mortgages have been purchased or securitized by Fannie Mae or Freddie Mac since January 1975.
> -- *Federal Housing Finance Agency*

### How to Set Up
* In terminal, clone the repo, `git clone https://github.com/zzyou/visual-housing-price.git`.
* In terminal, type `brew install mysql`, install MySQL.
* In terminal, type `brew services start mysql`, start MySQL.
* Download and install `Sequel Pro` (http://www.sequelpro.com/).
* Open Sequel Pro, and create a connection using `Host: 127.0.0.1` and `Username: root`.
* In the connection, add a database named `finalProject`.
* Inside `finalProject` database, create a table called `HPIyear`.
* For `HPIyear` table, add six columns: `id (INT), level (VARCHAR), place_name (VARCHAR), place_id (VARCHAR), yr (INT), index_nsa (FLOAT)`. 
* Then run the following query to load data into the database:
```
LOAD DATA LOCAL INFILE
'~/visual/client/public/data/HPIyear.csv'
INTO TABLE HPIyear
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id,level,place_name,place_id,yr,index_nsa); 
```
* In terminal, `cd visual`, `yarn dev`, enjoy!

### Function and Feature
Visualization of Housing Price Index (HPI) in the U.S., using chart and map.


**Tools**: Node, Express, API, React, D3.

* Chart of price change in country level, state level, city level.
* Chart of one location's price change across time (1975 - 2017).
* Map of price change in state level.
* Map of price change across time (1975 - 2017).

### Wireframe

|Visual Housing Price|Map|Chart|Dropdown|  
|---|---|---|---|  
|Map/Chart|  
|Copyright/Social Logo|

### Data Model

**Housing Price Index**
* Level: country level, state level, city level
* Name: state name or city name
* Year: 1975 - 2017
* Price: housing price index

### Visual Design
* Audience: homebuyer or anyone interested in housing price change.
* Category: descriptive analysis of housing price change.
* Color: white
* Font: google font Slabo
* Text size: 26px for page title, 11px for chart description and menu/button.
* Image: map and chart

* Responsive design: Navbar will become hamburger icon for mobile users. Map and chart will stay full screen for both computer users and mobile users.
