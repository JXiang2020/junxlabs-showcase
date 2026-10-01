CREATE TABLE IF NOT EXISTS site_visits (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  visits INTEGER NOT NULL
);

INSERT OR IGNORE INTO site_visits (id, visits) VALUES (1, 230);
