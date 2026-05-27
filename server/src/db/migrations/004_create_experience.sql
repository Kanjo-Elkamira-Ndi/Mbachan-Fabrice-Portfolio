CREATE TABLE IF NOT EXISTS experience (
  id           SERIAL PRIMARY KEY,
  organization VARCHAR(255) NOT NULL,
  role         VARCHAR(255) NOT NULL,
  period       VARCHAR(100) NOT NULL,
  location     VARCHAR(150) NOT NULL,
  highlights   TEXT[] NOT NULL DEFAULT '{}',
  order_index  INTEGER NOT NULL DEFAULT 0,
  visible      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);