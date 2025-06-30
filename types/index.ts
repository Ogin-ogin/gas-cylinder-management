// ...型定義雛形...
export type AccessToken = {
  id: string;
  token: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  last_accessed?: string;
  access_count: number;
};

export type Cylinder = {
  id: string;
  container_number: string;
  gas_type: string;
  location: string;
  initial_pressure: number;
  current_pressure: number;
  return_deadline: string;
  register_date: string;
  last_updated: string;
  qr_code_id?: string;
  qr_number?: number;
  token_id: string;
};
