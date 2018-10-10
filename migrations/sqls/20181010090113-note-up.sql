/* Replace with your SQL commands */

CREATE TABLE note(
    id SERIAL PRIMARY KEY,
    "noteName" VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    "createAt" TIMESTAMP WITH TIME ZONE,
    "updateAt" TIMESTAMP WITH TIME ZONE
);