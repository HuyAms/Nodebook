/* Replace with your SQL commands */

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    "firstName" VARCHAR (50) NOT NULL,
    "lastName" VARCHAR (50) NOT NULL,
    "username" VARCHAR (50) NOT NULL UNIQUE,
    email VARCHAR (355) NOT NULL UNIQUE,
    password VARCHAR (50) NOT NULL,
    role VARCHAR (50) CHECK (role in ('user', 'admin')),
    "createAt" TIMESTAMP WITH TIME ZONE,
    "updateAt" TIMESTAMP WITH TIME ZONE
);