import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { Trash2, Mail } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const fetchSubscribers = async () => {
    try {
      const res = await apiClient.get('/newsletter');
      setSubscribers(res.data.items);
    } catch (error) {
      console.error('Failed to fetch subscribers', error);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this subscriber?')) {
      try {
        await apiClient.delete(`/newsletter/${id}`);
        fetchSubscribers();
      } catch (error) {
        console.error('Failed to delete subscriber', error);
      }
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Newsletter Subscribers</h1>
        <div className="bg-[#161616] border border-white/5 px-4 py-2 rounded-lg flex items-center gap-2">
          <Mail size={18} className="text-blue-400" />
          <span className="font-semibold">{subscribers.length} Active</span>
        </div>
      </div>

      <div className="bg-[#161616] rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-sm">
            <tr>
              <th className="px-6 py-4 font-medium">Email Address</th>
              <th className="px-6 py-4 font-medium">Subscribed Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-medium">{sub.email}</td>
                <td className="px-6 py-4 text-gray-400">{new Date(sub.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {sub.is_active ? 'Active' : 'Unsubscribed'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(sub.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
