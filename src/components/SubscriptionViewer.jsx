import { Mail, Calendar, Download } from 'lucide-react';

export function SubscriptionsViewer({ subscriptions }) {
  const handleExport = () => {
    const csvContent = 'Email Address,Subscribed At\n' + 
      subscriptions.map(sub => `${sub.email},${sub.subscribedAt}`).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscriptions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">View all newsletter subscribers</p>
        {subscriptions.length > 0 && (
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export to CSV
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-gray-900">Subscribed Email Addresses ({subscriptions.length})</h3>
        </div>
        
        {subscriptions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No email subscriptions yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">#</th>
                  <th className="px-6 py-3 text-left text-gray-700">Email Address</th>
                  <th className="px-6 py-3 text-left text-gray-700">Subscribed At</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {subscriptions.map((subscription, index) => (
                  <tr key={subscription.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a
                          href={`mailto:${subscription.email}`}
                          className="text-indigo-600 hover:text-indigo-700"
                        >
                          {subscription.email}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{subscription.subscribedAt}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
