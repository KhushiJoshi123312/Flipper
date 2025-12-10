import { Mail, Phone, MapPin, User } from 'lucide-react';

export function ContactFormViewer({ submissions }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">View all contact form submissions from your website</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-gray-900">Contact Form Submissions ({submissions.length})</h3>
        </div>
        
        {submissions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No contact form submissions yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Full Name</th>
                  <th className="px-6 py-3 text-left text-gray-700">Email Address</th>
                  <th className="px-6 py-3 text-left text-gray-700">Mobile Number</th>
                  <th className="px-6 py-3 text-left text-gray-700">City</th>
                  <th className="px-6 py-3 text-left text-gray-700">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{submission.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a
                          href={`mailto:${submission.email}`}
                          className="text-indigo-600 hover:text-indigo-700"
                        >
                          {submission.email}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a
                          href={`tel:${submission.mobileNumber}`}
                          className="text-gray-900"
                        >
                          {submission.mobileNumber}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{submission.city}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {submission.submittedAt}
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
