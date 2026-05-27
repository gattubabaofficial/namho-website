import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { Plus, Trash2, Edit } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  is_active: boolean;
}

export function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = async () => {
    try {
      const res = await apiClient.get('/services');
      setServices(res.data.items);
    } catch (error) {
      console.error('Failed to fetch services', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await apiClient.delete(`/services/${id}`);
        fetchServices();
      } catch (error) {
        console.error('Failed to delete service', error);
      }
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Services & Software</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div className="bg-[#161616] rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-sm">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-medium">{service.title}</td>
                <td className="px-6 py-4 text-gray-400 capitalize">{service.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {service.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-3">
                  <button className="text-blue-400 hover:text-blue-300">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(service.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
