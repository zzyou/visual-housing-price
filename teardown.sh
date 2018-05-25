# chmod +rwx ./teardown.sh
# ./teardown.sh

#!/bin/bash

# Set variables
mysqlPath='/usr/local/bin/mysql'
host='127.0.0.1'
username='root'
database_name='finalProject'
table_name='HPIyear'


read -p "Are you sure you want to drop table $table_name? Reply y or n " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
   echo Dropping table $table_name...
    $mysqlPath -h $host -u $username -D $database_name -e "DROP TABLE $table_name"
fi


read -p "Are you sure you want to drop table $database_name? Reply y or n " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
   echo Dropping database $database_name...
    $mysqlPath -h $host -u $username -e "DROP DATABASE $database_name"
fi
