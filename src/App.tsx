import React, { useState } from 'react';
import { Target, TrendingUp, Clock, CheckCircle, Circle, User, BarChart3, Calendar, Plus, X, PlayCircle } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  role: 'SRE' | 'DevOps' | 'Platform' | 'AWS';
  status: 'not-started' | 'in-progress' | 'completed';
  notes: string;
  startedAt?: Date;
  completedAt?: Date;
  isCustom?: boolean;
}

const initialSkills: Skill[] = [
  // SRE Skills
  { id: '1', name: 'Design SLOs and error budgets', role: 'SRE', status: 'not-started', notes: '' },
  { id: '2', name: 'Deploy observability stack with Prometheus/Grafana', role: 'SRE', status: 'completed', notes: 'Completed production deployment', completedAt: new Date('2024-01-15') },
  { id: '3', name: 'Master incident response procedures', role: 'SRE', status: 'in-progress', notes: 'Currently studying ITIL framework', startedAt: new Date('2024-01-20') },
  { id: '4', name: 'Implement chaos engineering practices', role: 'SRE', status: 'not-started', notes: '' },
  { id: '5', name: 'Build comprehensive alerting and monitoring', role: 'SRE', status: 'not-started', notes: '' },
  { id: '6', name: 'Design and implement distributed tracing', role: 'SRE', status: 'not-started', notes: '' },
  { id: '7', name: 'Master log aggregation and analysis', role: 'SRE', status: 'not-started', notes: '' },
  { id: '8', name: 'Implement automated capacity planning', role: 'SRE', status: 'not-started', notes: '' },
  { id: '9', name: 'Build disaster recovery procedures', role: 'SRE', status: 'not-started', notes: '' },
  { id: '10', name: 'Design high-availability architectures', role: 'SRE', status: 'not-started', notes: '' },
  { id: '11', name: 'Implement performance testing and optimization', role: 'SRE', status: 'not-started', notes: '' },
  { id: '12', name: 'Master database reliability and scaling', role: 'SRE', status: 'not-started', notes: '' },
  { id: '13', name: 'Build automated runbook systems', role: 'SRE', status: 'not-started', notes: '' },
  { id: '14', name: 'Implement security monitoring and compliance', role: 'SRE', status: 'not-started', notes: '' },
  { id: '15', name: 'Design multi-region failover strategies', role: 'SRE', status: 'not-started', notes: '' },

  // DevOps Skills
  { id: '16', name: 'Build GitOps pipeline with ArgoCD', role: 'DevOps', status: 'completed', notes: 'Automated deployment pipeline', completedAt: new Date('2024-01-10') },
  { id: '17', name: 'Write reusable Helm charts', role: 'DevOps', status: 'in-progress', notes: 'Working on microservices templates', startedAt: new Date('2024-01-18') },
  { id: '18', name: 'Master Terraform for infrastructure as code', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '19', name: 'Implement comprehensive CI/CD security', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '20', name: 'Design multi-environment deployment strategies', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '21', name: 'Build automated testing pipelines', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '22', name: 'Implement container security scanning', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '23', name: 'Master cloud provider automation (AWS/GCP/Azure)', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '24', name: 'Build infrastructure monitoring and cost optimization', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '25', name: 'Implement secrets management and rotation', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '26', name: 'Design blue-green and canary deployments', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '27', name: 'Build automated backup and recovery systems', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '28', name: 'Master configuration management (Ansible/Chef/Puppet)', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '29', name: 'Implement compliance as code', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '30', name: 'Build cross-cloud deployment strategies', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '31', name: 'Design artifact management and versioning', role: 'DevOps', status: 'not-started', notes: '' },
  { id: '32', name: 'Implement automated rollback mechanisms', role: 'DevOps', status: 'not-started', notes: '' },

  // Platform Engineering Skills
  { id: '33', name: 'Master Kubernetes networking', role: 'Platform', status: 'not-started', notes: '' },
  { id: '34', name: 'Build multi-tenant platform on Kubernetes', role: 'Platform', status: 'not-started', notes: '' },
  { id: '35', name: 'Design service mesh architecture', role: 'Platform', status: 'completed', notes: 'Istio implementation completed', completedAt: new Date('2024-01-20') },
  { id: '36', name: 'Implement platform API and tooling', role: 'Platform', status: 'not-started', notes: '' },
  { id: '37', name: 'Build developer self-service portals', role: 'Platform', status: 'not-started', notes: '' },
  { id: '38', name: 'Design microservices communication patterns', role: 'Platform', status: 'not-started', notes: '' },
  { id: '39', name: 'Implement platform observability and metrics', role: 'Platform', status: 'not-started', notes: '' },
  { id: '40', name: 'Build automated resource provisioning', role: 'Platform', status: 'not-started', notes: '' },
  { id: '41', name: 'Design platform security and RBAC', role: 'Platform', status: 'not-started', notes: '' },
  { id: '42', name: 'Implement service discovery and load balancing', role: 'Platform', status: 'not-started', notes: '' },
  { id: '43', name: 'Build platform documentation and onboarding', role: 'Platform', status: 'not-started', notes: '' },
  { id: '44', name: 'Design event-driven architecture patterns', role: 'Platform', status: 'not-started', notes: '' },
  { id: '45', name: 'Implement platform cost management and chargeback', role: 'Platform', status: 'not-started', notes: '' },
  { id: '46', name: 'Build developer experience tooling and CLIs', role: 'Platform', status: 'not-started', notes: '' },
  { id: '47', name: 'Design platform scaling and auto-scaling', role: 'Platform', status: 'not-started', notes: '' },
  { id: '48', name: 'Implement platform governance and policies', role: 'Platform', status: 'not-started', notes: '' },
  { id: '49', name: 'Build internal marketplace for platform services', role: 'Platform', status: 'not-started', notes: '' },
  { id: '50', name: 'Design platform migration and modernization strategies', role: 'Platform', status: 'not-started', notes: '' },

  // AWS Architect Skills
  { id: '51', name: 'Design Well-Architected Framework solutions', role: 'AWS', status: 'not-started', notes: '' },
  { id: '52', name: 'Master VPC networking and security groups', role: 'AWS', status: 'not-started', notes: '' },
  { id: '53', name: 'Implement multi-account AWS Organizations strategy', role: 'AWS', status: 'not-started', notes: '' },
  { id: '54', name: 'Design serverless architectures with Lambda', role: 'AWS', status: 'not-started', notes: '' },
  { id: '55', name: 'Master RDS and DynamoDB design patterns', role: 'AWS', status: 'not-started', notes: '' },
  { id: '56', name: 'Implement AWS IAM security best practices', role: 'AWS', status: 'not-started', notes: '' },
  { id: '57', name: 'Design cost-optimized cloud architectures', role: 'AWS', status: 'not-started', notes: '' },
  { id: '58', name: 'Master CloudFormation and CDK', role: 'AWS', status: 'not-started', notes: '' },
  { id: '59', name: 'Implement AWS monitoring with CloudWatch', role: 'AWS', status: 'not-started', notes: '' },
  { id: '60', name: 'Design disaster recovery on AWS', role: 'AWS', status: 'not-started', notes: '' },
  { id: '61', name: 'Master container orchestration with ECS/EKS', role: 'AWS', status: 'not-started', notes: '' },
  { id: '62', name: 'Implement AWS security and compliance', role: 'AWS', status: 'not-started', notes: '' },
  { id: '63', name: 'Design event-driven architectures with EventBridge', role: 'AWS', status: 'not-started', notes: '' },
  { id: '64', name: 'Master AWS data analytics services', role: 'AWS', status: 'not-started', notes: '' },
  { id: '65', name: 'Implement AWS DevOps with CodePipeline', role: 'AWS', status: 'not-started', notes: '' },
  { id: '66', name: 'Design hybrid cloud connectivity', role: 'AWS', status: 'not-started', notes: '' },
  { id: '67', name: 'Master AWS migration strategies', role: 'AWS', status: 'not-started', notes: '' },
  { id: '68', name: 'Implement AWS backup and recovery solutions', role: 'AWS', status: 'not-started', notes: '' },
];

const roleConfig = {
  SRE: {
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    description: 'Site Reliability Engineering - Reliability, incident response, observability'
  },
  DevOps: {
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    description: 'DevOps Engineering - CI/CD, automation, infrastructure as code'
  },
  Platform: {
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    description: 'Platform Engineering - Service abstraction, tooling, ecosystem scaling'
  },
  AWS: {
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    description: 'AWS Solutions Architect - Cloud architecture, security, cost optimization'
  }
};

function App() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'skills' | 'timeline'>('dashboard');
  const [selectedRole, setSelectedRole] = useState<'all' | 'SRE' | 'DevOps' | 'Platform' | 'AWS'>('all');
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillRole, setNewSkillRole] = useState<'SRE' | 'DevOps' | 'Platform' | 'AWS'>('SRE');

  const updateSkillStatus = (id: string, newStatus: 'not-started' | 'in-progress' | 'completed') => {
    setSkills(prev => prev.map(skill => {
      if (skill.id === id) {
        const updatedSkill = { ...skill, status: newStatus };
        
        if (newStatus === 'in-progress' && skill.status === 'not-started') {
          updatedSkill.startedAt = new Date();
        } else if (newStatus === 'completed') {
          updatedSkill.completedAt = new Date();
          if (!updatedSkill.startedAt) {
            updatedSkill.startedAt = new Date();
          }
        } else if (newStatus === 'not-started') {
          delete updatedSkill.startedAt;
          delete updatedSkill.completedAt;
        }
        
        return updatedSkill;
      }
      return skill;
    }));
  };

  const updateSkillNotes = (id: string, notes: string) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id ? { ...skill, notes } : skill
    ));
  };

  const addCustomSkill = () => {
    if (newSkillName.trim()) {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: newSkillName.trim(),
        role: newSkillRole,
        status: 'not-started',
        notes: '',
        isCustom: true
      };
      setSkills(prev => [...prev, newSkill]);
      setNewSkillName('');
      setShowAddSkill(false);
    }
  };

  const removeCustomSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  const getProgressByRole = (role: 'SRE' | 'DevOps' | 'Platform' | 'AWS') => {
    const roleSkills = skills.filter(skill => skill.role === role);
    const completed = roleSkills.filter(skill => skill.status === 'completed').length;
    const inProgress = roleSkills.filter(skill => skill.status === 'in-progress').length;
    return { 
      completed, 
      inProgress,
      total: roleSkills.length, 
      percentage: Math.round((completed / roleSkills.length) * 100) 
    };
  };

  const getFilteredSkills = () => {
    return selectedRole === 'all' ? skills : skills.filter(skill => skill.role === selectedRole);
  };

  const completedSkills = skills.filter(skill => skill.status === 'completed' && skill.completedAt)
    .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <PlayCircle className="w-6 h-6 text-yellow-500" />;
      default:
        return <Circle className="w-6 h-6 text-slate-400 hover:text-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-slate-500 line-through';
      case 'in-progress':
        return 'text-slate-900 font-medium';
      default:
        return 'text-slate-900';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">SkillFlight</h1>
                <p className="text-sm text-slate-600">Engineering Skills Tracker</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'skills'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Skills
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'timeline'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Timeline
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Engineering Journey</h2>
              <p className="text-slate-600 text-lg">Track your progress toward senior-level expertise across {skills.length} essential skills</p>
            </div>

            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(['SRE', 'DevOps', 'Platform', 'AWS'] as const).map((role) => {
                const progress = getProgressByRole(role);
                const config = roleConfig[role];
                return (
                  <div key={role} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className={`h-2 bg-gradient-to-r ${config.color}`} />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-900">{role}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}>
                          {progress.percentage}%
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">{config.description}</p>
                      
                      {/* Progress Stats */}
                      <div className="mb-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600 font-medium">✓ Completed</span>
                          <span className="text-green-600">{progress.completed}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-yellow-600 font-medium">⚡ In Progress</span>
                          <span className="text-yellow-600">{progress.inProgress}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 font-medium">○ Not Started</span>
                          <span className="text-slate-600">{progress.total - progress.completed - progress.inProgress}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-slate-600 mb-2">
                          <span>Progress</span>
                          <span>{progress.completed} of {progress.total} skills</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${config.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Circular Progress */}
                      <div className="flex items-center justify-center">
                        <div className="relative w-16 h-16">
                          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              fill="none"
                              stroke="#e2e8f0"
                              strokeWidth="4"
                            />
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              fill="none"
                              stroke="url(#gradient)"
                              strokeWidth="4"
                              strokeDasharray={`${progress.percentage * 1.76} 176`}
                              strokeLinecap="round"
                              className="transition-all duration-700"
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={role === 'SRE' ? '#3b82f6' : role === 'DevOps' ? '#10b981' : role === 'Platform' ? '#8b5cf6' : '#f97316'} />
                                <stop offset="100%" stopColor={role === 'SRE' ? '#2563eb' : role === 'DevOps' ? '#059669' : role === 'Platform' ? '#7c3aed' : '#ea580c'} />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-slate-700">{progress.percentage}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Overall Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Overall Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{skills.filter(s => s.status === 'completed').length}</div>
                  <div className="text-sm text-slate-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{skills.filter(s => s.status === 'in-progress').length}</div>
                  <div className="text-sm text-slate-600">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{skills.length}</div>
                  <div className="text-sm text-slate-600">Total Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    {Math.round((skills.filter(s => s.status === 'completed').length / skills.length) * 100)}%
                  </div>
                  <div className="text-sm text-slate-600">Overall Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4</div>
                  <div className="text-sm text-slate-600">Engineering Roles</div>
                </div>
              </div>
            </div>

            {/* Skill Distribution */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Skill Distribution by Role</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {(['SRE', 'DevOps', 'Platform', 'AWS'] as const).map((role) => {
                  const progress = getProgressByRole(role);
                  const config = roleConfig[role];
                  return (
                    <div key={role} className={`${config.bgColor} rounded-xl p-4 border ${config.borderColor}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold ${config.textColor}`}>{role}</h4>
                        <span className="text-sm text-slate-600">{progress.total} skills</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">✓ {progress.completed}</span>
                          <span className="text-yellow-600">⚡ {progress.inProgress}</span>
                        </div>
                        <div className="text-sm text-slate-600">
                          {progress.total - progress.completed - progress.inProgress} not started
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Skills Tracker</h2>
                <p className="text-slate-600 mt-1">
                  {getFilteredSkills().length} skills • {getFilteredSkills().filter(s => s.status === 'completed').length} completed • {getFilteredSkills().filter(s => s.status === 'in-progress').length} in progress
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowAddSkill(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as any)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Roles ({skills.length})</option>
                  <option value="SRE">SRE ({skills.filter(s => s.role === 'SRE').length})</option>
                  <option value="DevOps">DevOps ({skills.filter(s => s.role === 'DevOps').length})</option>
                  <option value="Platform">Platform ({skills.filter(s => s.role === 'Platform').length})</option>
                  <option value="AWS">AWS ({skills.filter(s => s.role === 'AWS').length})</option>
                </select>
              </div>
            </div>

            {/* Add Skill Modal */}
            {showAddSkill && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">Add Custom Skill</h3>
                    <button
                      onClick={() => setShowAddSkill(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        placeholder="Enter skill name..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newSkillRole}
                        onChange={(e) => setNewSkillRole(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="SRE">SRE</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Platform">Platform</option>
                        <option value="AWS">AWS</option>
                      </select>
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={addCustomSkill}
                        disabled={!newSkillName.trim()}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Add Skill
                      </button>
                      <button
                        onClick={() => setShowAddSkill(false)}
                        className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {getFilteredSkills().map((skill) => {
                const config = roleConfig[skill.role];
                return (
                  <div key={skill.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col space-y-2 mt-1">
                        <button
                          onClick={() => updateSkillStatus(skill.id, skill.status === 'not-started' ? 'in-progress' : skill.status === 'in-progress' ? 'completed' : 'not-started')}
                          className="flex-shrink-0"
                          title={skill.status === 'not-started' ? 'Start skill' : skill.status === 'in-progress' ? 'Mark as completed' : 'Reset to not started'}
                        >
                          {getStatusIcon(skill.status)}
                        </button>
                        
                        {/* Status dropdown */}
                        <select
                          value={skill.status}
                          onChange={(e) => updateSkillStatus(skill.id, e.target.value as any)}
                          className="text-xs border border-slate-200 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="not-started">Not Started</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`text-lg font-semibold ${getStatusColor(skill.status)}`}>
                            {skill.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bgColor} ${config.textColor}`}>
                            {skill.role}
                          </span>
                          {skill.isCustom && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                              Custom
                            </span>
                          )}
                          {skill.status === 'in-progress' && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                              In Progress
                            </span>
                          )}
                        </div>
                        <textarea
                          value={skill.notes}
                          onChange={(e) => updateSkillNotes(skill.id, e.target.value)}
                          placeholder="Add notes about your progress, resources, or implementation details..."
                          className="w-full mt-2 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                          rows={2}
                        />
                        <div className="mt-2 flex items-center space-x-4 text-sm text-slate-600">
                          {skill.startedAt && (
                            <div className="flex items-center">
                              <PlayCircle className="w-4 h-4 mr-1 text-yellow-500" />
                              Started on {skill.startedAt.toLocaleDateString()}
                            </div>
                          )}
                          {skill.status === 'completed' && skill.completedAt && (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Completed on {skill.completedAt.toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      {skill.isCustom && (
                        <button
                          onClick={() => removeCustomSkill(skill.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                          title="Remove custom skill"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Achievement Timeline</h2>
              <p className="text-slate-600 mt-1">
                {completedSkills.length} skills completed • Track your learning journey
              </p>
            </div>
            
            {completedSkills.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No completed skills yet</h3>
                <p className="text-slate-600">Start completing skills to see your progress timeline!</p>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                <div className="space-y-6">
                  {completedSkills.map((skill, index) => {
                    const config = roleConfig[skill.role];
                    return (
                      <div key={skill.id} className="relative flex items-start space-x-6">
                        <div className={`w-8 h-8 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center flex-shrink-0 relative z-10`}>
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-slate-900 mb-1">{skill.name}</h3>
                              <div className="flex items-center space-x-3 mb-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bgColor} ${config.textColor}`}>
                                  {skill.role}
                                </span>
                                {skill.isCustom && (
                                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                                    Custom
                                  </span>
                                )}
                                <span className="text-sm text-slate-500">
                                  {skill.completedAt?.toLocaleDateString()}
                                </span>
                              </div>
                              {skill.notes && (
                                <p className="text-slate-600 mt-2">{skill.notes}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;