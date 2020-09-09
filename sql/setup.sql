DROP TABLE IF EXISTS hamsters;
DROP TABLE IF EXISTS chickens;
DROP TABLE IF EXISTS cows;
DROP TABLE IF EXISTS veggies;

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

CREATE TABLE cows (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  breed TEXT,
  weight TEXT
);

CREATE TABLE veggies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT,
  weight BIGINT
);