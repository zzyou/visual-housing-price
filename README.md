# Viztory

## Visual House Price

Final Project at Techtonica.

**Tools**: _Node, Express, MySQL, React, D3, OAuth_

<img src="./client/public/Viztory.gif" alt="Viztory GIF" />

###

### [Data](https://catalog.data.gov/dataset/fhfa-house-price-indexes-hpis)

#### [House Price Index (HPI)](https://www.fhfa.gov/KeyTopics/pages/house-price-index.aspx)

> The HPI is a broad measure of the movement of single-family house prices in the United States. The HPI is a weighted, repeat-sales index, meaning that it measures average price changes in repeat sales or refinancings on the same properties. This information is obtained by reviewing repeat mortgage transactions on single-family properties whose mortgages have been purchased or securitized by Fannie Mae or Freddie Mac since January 1975.
>
> -- _Federal Housing Finance Agency_

###

### How to Set Up

- In terminal, in home directory `~`, clone the repo, `git clone https://github.com/zzyou/visual-housing-price.git`.
- In terminal, `cd visual-housing-price`, run `brew install mysql`, install MySQL.
- In terminal, run `brew services start mysql`, start MySQL.
- Download and install [Sequel Pro](http://www.sequelpro.com/).
- Open Sequel Pro, create a connection using `Host: 127.0.0.1` and `Username: root`. The port is 3306 by default.
- In the connection, add a database named `finalProject`.
- Go to `finalProject` database, run the following query to create a table called `HPIyear`.

```
CREATE TABLE HPIyear (
    id INT(11),
    level VARCHAR(80),
    place_name VARCHAR(80),
    place_id VARCHAR(80),
    yr INT(11),
    index_nsa FLOAT,
    PRIMARY KEY (id)
);
```

- Then run another query to load data into `HPIyear` table:

```
LOAD DATA LOCAL INFILE
    '~/visual-housing-price/client/public/data/HPIyear.csv'
INTO TABLE HPIyear
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
    (id, level, place_name, place_id, yr, index_nsa);
```

- In terminal, `cd client`, run `npm install`, install all node modules for client side.
- In terminal, `cd ../` to go back to the root directory, run `npm install`, install all node modules for server side.
- In terminal, still in the root directory, run `yarn dev`, enjoy!

###

### Data Model

#### House Price Index

- **Level**: country level, state level, city level
- **Name**: state name or city name
- **Year**: 1975 - 2017
- **Price**: house price index

###

### Function and Feature

Visualization of House Price Index (HPI) in the U.S., using D3 charts.

- Charts of price change in state level, city level.
- Charts of one location's price change across time (1975 - 2017).
