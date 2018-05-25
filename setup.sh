# chmod +rwx ./setup.sh
# ./setup.sh

#!/bin/bash

set -e  # Flag causes script to exit if there's an error

# Set variables
mysqlPath='/usr/local/bin/mysql'
host='127.0.0.1'
username='root'
database_name='finalProject'
table_name='HPIyear'

echo Creating database $database_name...
$mysqlPath -h $host -u $username -c "CREATE DATABASE $database_name;"

echo Creating table $table_name...
$mysqlPath -h $host -u $username -D $database_name -e "CREATE TABLE HPIyear (
    id INT(11), 
    level VARCHAR(80), 
    place_name VARCHAR(80), 
    place_id VARCHAR(80), 
    yr INT(11), 
    index_nsa FLOAT,
    PRIMARY KEY (id)
);"


# todo: need to figure out how to load data

# echo Loading data into table $table_name...
# $mysqlPath -h $host -u $username -D $database_name -e "LOAD DATA LOCAL INFILE 
# '~/visual/client/public/data/HPIyear.csv'
# INTO TABLE HPIyear
# FIELDS TERMINATED BY ','
# ENCLOSED BY '\"'
# LINES TERMINATED BY '\n'
# IGNORE 1 ROWS
# (id, level, place_name, place_id, yr, index_nsa);"

# echo Showing the first line of table $table_name...
# $mysqlPath -h $host -u $username -D $database_name -e 
# "SELECT * FROM $table_name WHERE id = 1;"
