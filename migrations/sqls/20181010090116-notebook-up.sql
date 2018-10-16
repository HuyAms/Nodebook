/* Replace with your SQL commands */

CREATE TABLE notebook(
    id SERIAL PRIMARY KEY,
    "notebookName" VARCHAR (255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY ("userId") REFERENCES "user" (id) ON DELETE CASCADE
)
