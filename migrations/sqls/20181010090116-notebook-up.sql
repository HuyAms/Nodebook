/* Replace with your SQL commands */

CREATE TABLE notebook(
    id SERIAL PRIMARY KEY,
    "notebookName" VARCHAR (255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createAt" TIMESTAMP WITH TIME ZONE,
    "updateAt" TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY ("userId") REFERENCES "user" (id) ON DELETE CASCADE
)