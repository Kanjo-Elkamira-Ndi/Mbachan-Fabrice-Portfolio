CREATE TABLE IF NOT EXISTS testimonials (
  id           SERIAL PRIMARY KEY,
  quote        TEXT NOT NULL,
  author       VARCHAR(255) NOT NULL,
  role         VARCHAR(255) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  initials     VARCHAR(5) NOT NULL,
  color        VARCHAR(20) NOT NULL DEFAULT '#00E5FF',
  order_index  INTEGER NOT NULL DEFAULT 0,
  visible      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);