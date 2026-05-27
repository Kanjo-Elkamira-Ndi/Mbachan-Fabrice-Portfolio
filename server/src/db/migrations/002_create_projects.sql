CREATE TABLE IF NOT EXISTS projects (
  id           SERIAL PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  category     VARCHAR(100) NOT NULL,
  confidential BOOLEAN NOT NULL DEFAULT TRUE,
  challenge    TEXT NOT NULL,
  outcome      TEXT NOT NULL,
  metrics      TEXT[] NOT NULL DEFAULT '{}',
  technologies TEXT[] NOT NULL DEFAULT '{}',
  order_index  INTEGER NOT NULL DEFAULT 0,
  visible      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);