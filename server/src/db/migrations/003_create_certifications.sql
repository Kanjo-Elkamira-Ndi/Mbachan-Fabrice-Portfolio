CREATE TABLE IF NOT EXISTS certifications (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  issuer      VARCHAR(255) NOT NULL,
  year        VARCHAR(4) NOT NULL,
  color       VARCHAR(20) NOT NULL DEFAULT '#00E5FF',
  badge_url   TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  visible     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);