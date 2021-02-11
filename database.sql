-- To use the following, 
-- First create a DB called koala_holla
DROP TABLE IF EXISTS "koala";

-- Create a table called Koala with these headers
CREATE TABLE "koala" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(32),
	"gender" VARCHAR(1),
	"age" INTEGER,
	"ready_to_transfer" VARCHAR(1),
	"notes" VARCHAR(1024)
);

-- Insert Sample Data
INSERT INTO "koala"
	("name", "gender", "age", "ready_to_transfer", "notes")
VALUES
	('Scotty', 'M', 4, 'Y', 'Born in Guatemala'),
	('Jean', 'F', 5, 'Y', 'Allergic to lots of lava'),
	('Ororo', 'F', 7, 'N', 'Loves listening to Paula (Abdul)'),
	('Logan', 'M', 15, 'N', 'Loves the sauana'),
	('Charlie', 'M', 9, 'Y', 'Favorite band is Nirvana'),
	('Betsy', 'F', 4, 'Y', 'Has a pet iguana');
  