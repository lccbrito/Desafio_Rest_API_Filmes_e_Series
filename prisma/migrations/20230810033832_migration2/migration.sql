-- CreateTable
CREATE TABLE "Series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "director" TEXT,
    "year" INTEGER,
    "seasons" INTEGER,
    "episodes" INTEGER
);
