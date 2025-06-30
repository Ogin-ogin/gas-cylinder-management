-- Supabase用テーブル作成スクリプト
-- access_tokens
CREATE TABLE IF NOT EXISTS access_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  last_accessed TIMESTAMP,
  access_count INTEGER DEFAULT 0
);

-- cylinders（依存なしなので先に作成）
CREATE TABLE IF NOT EXISTS cylinders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  container_number VARCHAR(50) UNIQUE NOT NULL,
  gas_type VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  initial_pressure DECIMAL(5,2) NOT NULL,
  current_pressure DECIMAL(5,2) NOT NULL,
  return_deadline DATE NOT NULL,
  register_date TIMESTAMP DEFAULT NOW(),
  last_updated TIMESTAMP DEFAULT NOW(),
  qr_code_id UUID,
  qr_number INTEGER,
  token_id UUID REFERENCES access_tokens(id)
);

-- qr_codes（cylinders, access_tokensに依存）
CREATE TABLE IF NOT EXISTS qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cylinder_id UUID REFERENCES cylinders(id),
  url TEXT NOT NULL,
  qr_number INTEGER UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  token_id UUID REFERENCES access_tokens(id)
);

-- cylindersテーブルのqr_code_idに外部キー制約を後から追加
ALTER TABLE cylinders
  ADD CONSTRAINT fk_qr_code_id FOREIGN KEY (qr_code_id) REFERENCES qr_codes(id);

-- pressure_history
CREATE TABLE IF NOT EXISTS pressure_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cylinder_id UUID REFERENCES cylinders(id) ON DELETE CASCADE,
  pressure DECIMAL(5,2) NOT NULL,
  date TIMESTAMP DEFAULT NOW(),
  token_id UUID REFERENCES access_tokens(id)
);
