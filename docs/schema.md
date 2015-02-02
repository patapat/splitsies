# Schema Information

## tabs
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
participant | integer   | not null
date        | date      | not null
total_amount| float     | not null
tag         | string    |

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
friend_id       | integer   |
owed_tab_id     | integer   |
