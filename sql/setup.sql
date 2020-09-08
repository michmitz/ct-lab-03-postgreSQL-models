DROP TABLE IF EXISTS hamsters;
DROP TABLE IF EXISTS chickens;

CREATE TABLE hamsters (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  age INT CHECK (age > 0),
  color TEXT
);

CREATE TABLE chickens (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  breed TEXT,
  weight TEXT
);