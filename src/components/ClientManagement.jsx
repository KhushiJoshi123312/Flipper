import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export function ClientManagement({ clients, onAddClient, onDeleteClient }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    description: '',
    designation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.image && formData.designation) {
      onAddClient(formData);
      setFormData({ image: '', name: '', description: '', designation: '' });
      setShowForm(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Manage your clients and testimonials</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Client
        </button>
      </div>

      {/* Add Client Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border">
          <h3 className="text-gray-900 mb-4">Add New Client</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="client-image" className="block text-gray-700 mb-2">
                Client Image URL
              </label>
              <input
                id="client-image"
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="client-name" className="block text-gray-700 mb-2">
                Client Name
              </label>
              <input
                id="client-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter client name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="client-designation" className="block text-gray-700 mb-2">
                Client Designation
              </label>
              <input
                id="client-designation"
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="e.g., CEO, Web Developer, Designer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="client-description" className="block text-gray-700 mb-2">
                Client Description
              </label>
              <textarea
                id="client-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter client testimonial or description"
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
                Add Client
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ image: '', name: '', description: '', designation: '' });
                }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Clients List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-gray-900">All Clients ({clients.length})</h3>
        </div>
        {clients.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No clients added yet. Click "Add Client" to get started.
          </div>
        ) : (
          <div className="divide-y">
            {clients.map((client) => (
              <div key={client.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex gap-6">
                  <ImageWithFallback
                    src={client.image}
                    alt={client.name}
                    className="w-24 h-24 object-cover rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-gray-900">{client.name}</h4>
                        <p className="text-indigo-600 mt-1">{client.designation}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{client.description}</p>
                  </div>
                  <button
                    onClick={() => onDeleteClient(client.id)}
                    className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors self-start"
                    title="Delete client"
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
