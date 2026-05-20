-- Create database schema for high-throughput network security logs
create table if not exists network_incident_logs (
  id uuid primary key default gen_random_uuid(),
  ip_address inet not null,           
  request_method text not null,        
  status_code integer not null,        
  payload_size_bytes integer not null,    
  risk_score numeric(3, 2) default 0.00,  
  security_summary text not null,          
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


create index if not exists idx_incident_ip on network_incident_logs(ip_address);
create index if not exists idx_incident_risk on network_incident_logs(risk_score);
