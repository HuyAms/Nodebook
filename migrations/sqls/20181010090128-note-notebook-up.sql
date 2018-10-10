/* Replace with your SQL commands */

CREATE TABLE note_notebook (
    id SERIAL PRIMARY KEY,
    "notebookId" INTEGER NOT NULL,
    "noteId" INTEGER NOT NULL,
    "createAt" TIMESTAMP WITH TIME ZONE,
    "updateAt" TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY ("notebookId") REFERENCES "notebook" (id) ON DELETE CASCADE,
    FOREIGN KEY ("noteId") REFERENCES note (id) ON DELETE CASCADE
)