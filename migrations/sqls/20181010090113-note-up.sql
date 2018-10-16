/* Replace with your SQL commands */

CREATE TABLE note(
    id SERIAL PRIMARY KEY,
    "noteName" VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
