import { useState } from 'react';
import { LayoutDashboard, FolderKanban, Users, Mail, UserPlus } from 'lucide-react';
import { ProjectManagement } from './ProjectManagement';
import { ClientManagement } from './ClientManagement';
import { ContactFormViewer } from './ContactFromViewer';
import { SubscriptionsViewer } from './SubscriptionViewer';


// Mock data
const mockProjects = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1627634771121-fa3db5779f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3R8ZW58MXx8fHwxNzY1Mjg3NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with payment integration, inventory management, and customer analytics.',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzY1MjkxMzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'Fitness Tracking App',
    description: 'Mobile application for tracking workouts, nutrition, and fitness goals with social features.',
  },
];

const mockClients = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTMyMTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'Sarah Johnson',
    description: 'Working with this team was an absolute pleasure. They delivered our project on time and exceeded all expectations with their attention to detail.',
    designation: 'CEO, TechStart Inc',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTMyMTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'Michael Chen',
    description: 'The design and functionality of our new website is outstanding. Our conversion rates have increased by 40% since launch.',
    designation: 'Marketing Director, GrowthCo',
  },
];

const mockContactSubmissions = [
  {
    id: '1',
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    mobileNumber: '+1 (555) 123-4567',
    city: 'New York',
    submittedAt: 'Dec 8, 2025',
  },
  {
    id: '2',
    fullName: 'Emily Davis',
    email: 'emily.davis@example.com',
    mobileNumber: '+1 (555) 987-6543',
    city: 'Los Angeles',
    submittedAt: 'Dec 9, 2025',
  },
  {
    id: '3',
    fullName: 'David Wilson',
    email: 'david.wilson@example.com',
    mobileNumber: '+1 (555) 456-7890',
    city: 'Chicago',
    submittedAt: 'Dec 10, 2025',
  },
];

const mockSubscriptions = [
  {
    id: '1',
    email: 'subscriber1@example.com',
    subscribedAt: 'Dec 5, 2025',
  },
  {
    id: '2',
    email: 'subscriber2@example.com',
    subscribedAt: 'Dec 7, 2025',
  },
  {
    id: '3',
    email: 'subscriber3@example.com',
    subscribedAt: 'Dec 9, 2025',
  },
  {
    id: '4',
    email: 'subscriber4@example.com',
    subscribedAt: 'Dec 10, 2025',
  },
];

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState(mockProjects);
  const [clients, setClients] = useState(mockClients);
  const [contactSubmissions] = useState(mockContactSubmissions);
  const [subscriptions] = useState(mockSubscriptions);

  const handleAddProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleAddClient = (client) => {
    const newClient = {
      ...client,
      id: Date.now().toString(),
    };
    setClients([...clients, newClient]);
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const tabs = [
    { id: 'projects' , label: 'Project Management', icon: FolderKanban },
    { id: 'clients' , label: 'Client Management', icon: Users },
    { id: 'contacts' , label: 'Contact Forms', icon: Mail },
    { id: 'subscriptions', label: 'Subscriptions', icon: UserPlus },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-indigo-600" />
            <h1 className="text-gray-900">Admin Panel</h1>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' && (
          <div>
            <h2 className="text-gray-900 mb-6">Project Management</h2>
            <ProjectManagement
              projects={projects}
              onAddProject={handleAddProject}
              onDeleteProject={handleDeleteProject}
            />
          </div>
        )}
        {activeTab === 'clients' && (
          <div>
            <h2 className="text-gray-900 mb-6">Client Management</h2>
            <ClientManagement
              clients={clients}
              onAddClient={handleAddClient}
              onDeleteClient={handleDeleteClient}
            />
          </div>
        )}
        {activeTab === 'contacts' && (
          <div>
            <h2 className="text-gray-900 mb-6">Contact Form Submissions</h2>
            <ContactFormViewer submissions={contactSubmissions} />
          </div>
        )}
        {activeTab === 'subscriptions' && (
          <div>
            <h2 className="text-gray-900 mb-6">Subscribed Email Addresses</h2>
            <SubscriptionsViewer subscriptions={subscriptions} />
          </div>
        )}
      </main>
    </div>
  );
}