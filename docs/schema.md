# Schema Information

## tabs
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key
title       | string    | not null
date        | date      | not null
total_amount| decimal   | not null, precision 6, scale 2
tag         | string    |

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
account_balance | decimal   | default => 0, precision 6, scale 2

## users_tabs
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key
tab_id          | integer   | not null, foreign key
amount_owed     | decimal   | not null, precision 6, scale 2
paid            | boolean   | default => false

## users_friends
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key
friend_id       | integer   | not null, foreign key
