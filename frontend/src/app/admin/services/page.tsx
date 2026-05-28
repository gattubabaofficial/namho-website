"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  features: string[];
  display_order: number;
  is_active: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/services/admin");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.description) return;

    const body = {
      title: editingService.title,
      description: editingService.description,
      category: editingService.category || "tech",
      icon: editingService.icon || "solar:case-outline",
      color: editingService.color || "from-emerald-400 to-teal-500",
      features: Array.isArray(editingService.features) 
        ? editingService.features 
        : typeof editingService.features === "string" 
          ? (editingService.features as string).split(",").map(f => f.trim()) 
          : [],
      display_order: Number(editingService.display_order) || 1,
      is_active: editingService.is_active !== undefined ? editingService.is_active : true,
    };

    try {
      let res;
      if (editingService.id) {
        // Edit
        res = await adminFetch(`/services/${editingService.id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        // Create
        res = await adminFetch("/services", {
          method: "POST",
          body: JSON.stringify(body),
        });
      }

      if (res.ok) {
        setFormOpen(false);
        setEditingService(null);
        fetchServices();
      } else {
        const err = await res.json();
        alert(err.detail || "Failed to save service");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await adminFetch(`/services/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bricolage font-medium mb-1">Services & Capabilities</h1>
          <p className="text-white/50 text-sm">Manage the dynamic cards rendered in the Services section and page.</p>
        </div>
        <button
          onClick={() => {
            setEditingService({
              title: "",
              description: "",
              category: "tech",
              icon: "solar:case-outline",
              color: "from-blue-500 to-cyan-400",
              features: [],
              display_order: services.length + 1,
              is_active: true,
            });
            setFormOpen(true);
          }}
          className="bg-white hover:bg-neutral-200 text-black px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"
        >
          {/* @ts-expect-error */}
          <iconify-icon icon="solar:plus-outline" width="18"></iconify-icon>
          Add Service
        </button>
      </div>

      {loading ? (
        <div className="text-white/40 font-mono text-sm">Loading services data...</div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wider font-mono">
              <tr>
                <th className="px-6 py-4 font-medium">Order</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-white/40">{service.display_order}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center border border-white/5 text-white shrink-0">
                        {/* @ts-expect-error */}
                        <iconify-icon icon={service.icon} width="20"></iconify-icon>
                      </div>
                      <div>
                        <span className="font-medium text-white block">{service.title}</span>
                        <span className="text-xs text-white/40 line-clamp-1 max-w-sm">{service.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 uppercase tracking-wider font-mono text-xs text-white/50">{service.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      service.is_active 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}>
                      {service.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingService(service);
                        setFormOpen(true);
                      }}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
                    >
                      {/* @ts-expect-error */}
                      <iconify-icon icon="solar:pen-linear" width="16"></iconify-icon>
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 hover:text-red-350 transition-all"
                    >
                      {/* @ts-expect-error */}
                      <iconify-icon icon="solar:trash-bin-trash-linear" width="16"></iconify-icon>
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-white/40 font-mono text-sm">
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal */}
      {formOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 p-8 rounded-3xl w-full max-w-xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bricolage font-medium mb-6 text-white">
              {editingService.id ? "Edit Service" : "Add Service"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={editingService.title || ""}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Category</label>
                  <select
                    value={editingService.category || "tech"}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  >
                    <option value="tech">Tech / Software</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Description</label>
                <textarea
                  required
                  rows={3}
                  value={editingService.description || ""}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Iconify Icon</label>
                  <input
                    type="text"
                    required
                    value={editingService.icon || ""}
                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Color Gradient</label>
                  <input
                    type="text"
                    required
                    value={editingService.color || ""}
                    onChange={(e) => setEditingService({ ...editingService, color: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                    placeholder="from-blue-500 to-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Display Order</label>
                  <input
                    type="number"
                    required
                    value={editingService.display_order || 0}
                    onChange={(e) => setEditingService({ ...editingService, display_order: Number(e.target.value) })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Features (Comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(editingService.features) ? editingService.features.join(", ") : (editingService.features || "")}
                  onChange={(e) => setEditingService({ ...editingService, features: e.target.value as any })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingService.is_active || false}
                  onChange={(e) => setEditingService({ ...editingService, is_active: e.target.checked })}
                  className="rounded border-white/10 bg-black text-emerald-500 focus:ring-emerald-500/50"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-white/80">Active / Render in site</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-medium text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-sm font-medium transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
