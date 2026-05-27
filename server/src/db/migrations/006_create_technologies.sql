CREATE TABLE IF NOT EXISTS technologies (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  category    VARCHAR(100) NOT NULL,
  icon_url    TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  visible     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);