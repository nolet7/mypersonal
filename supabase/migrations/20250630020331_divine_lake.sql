-- Initialize SkillFlight database schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create skills table for future database integration
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('SRE', 'DevOps', 'Platform', 'AWS')),
    status VARCHAR(20) NOT NULL DEFAULT 'not-started' CHECK (status IN ('not-started', 'in-progress', 'completed')),
    notes TEXT DEFAULT '',
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    is_custom BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_skills_role ON skills(role);
CREATE INDEX IF NOT EXISTS idx_skills_status ON skills(status);
CREATE INDEX IF NOT EXISTS idx_skills_completed_at ON skills(completed_at);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_skills_updated_at 
    BEFORE UPDATE ON skills 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO skills (name, role, status, notes) VALUES
('Design SLOs and error budgets', 'SRE', 'not-started', ''),
('Deploy observability stack with Prometheus/Grafana', 'SRE', 'completed', 'Completed production deployment'),
('Master incident response procedures', 'SRE', 'in-progress', 'Currently studying ITIL framework'),
('Build GitOps pipeline with ArgoCD', 'DevOps', 'completed', 'Automated deployment pipeline'),
('Write reusable Helm charts', 'DevOps', 'in-progress', 'Working on microservices templates'),
('Master Kubernetes networking', 'Platform', 'not-started', ''),
('Design service mesh architecture', 'Platform', 'completed', 'Istio implementation completed'),
('Design Well-Architected Framework solutions', 'AWS', 'not-started', '')
ON CONFLICT DO NOTHING;