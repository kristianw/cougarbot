CREATE TABLE Players (
  playerId INTEGER PRIMARY KEY AUTOINCREMENT,
  playerName TEXT UNIQUE NOT NULL,
  availableToPlay INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE Payment (
    playerIndex INTEGER PRIMARY KEY
);

INSERT INTO Players (playerName) VALUES
('Prince'),
('Jesse'),
('Walsh'),
('Simo'),
('Justin'),
('Danny'),
('Rhys');

INSERT INTO Payment (playerIndex) VALUES
(3);