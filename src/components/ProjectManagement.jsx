import { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export function ProjectManagement({ projects, onAddProject, onDeleteProject }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.image) {
      onAddProject(formData);
      setFormData({ image: '', name: '', description: '' });
      setShowForm(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Manage your portfolio projects</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Add Project Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border">
          <h3 className="text-gray-900 mb-4">Add New Project</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="project-image" className="block text-gray-700 mb-2">
                Project Image URL
              </label>
              <input
                id="project-image"
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="project-name" className="block text-gray-700 mb-2">
                Project Name
              </label>
              <input
                id="project-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter project name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="project-description" className="block text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                id="project-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter project description"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Project
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ image: '', name: '', description: '' });
                }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-gray-900">All Projects ({projects.length})</h3>
        </div>
        {projects.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No projects added yet. Click "Add Project" to get started.
          </div>
        ) : (
          <div className="divide-y">
            {projects.map((project) => (
              <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex gap-6">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.name}
                    className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 mb-2">{project.name}</h4>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                  <button
                    onClick={() => onDeleteProject(project.id)}
                    className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors self-start"
                    title="Delete project"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
