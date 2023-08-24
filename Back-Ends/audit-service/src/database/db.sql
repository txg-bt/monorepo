-- CREATE DATABASE audit_service;
-- \c audit_service
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE logs (
  log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route VARCHAR(255),
  status_code INT,
  message TEXT,
  user_id UUID,
  app_name VARCHAR(255),
  timestamp TIMESTAMP 
);