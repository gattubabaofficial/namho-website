"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image_url: string;
  is_featured: boolean;
  display_order: number;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/projects/admin");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.description) return;

    const body = {
      title: editingProject.title,
      description: editingProject.description,
      category: editingProject.category || "deep-space",
      technologies: Array.isArray(editingProject.technologies)
        ? editingProject.technologies
        : typeof editingProject.technologies === "string"
          ? (editingProject.technologies as string).split(",").map(t => t.trim())
          : [],
      image_url: editingProject.image_url || "/assets/cloudinfra-image.webp",
      is_featured: editingProject.is_featured !== undefined ? editingProject.is_featured : true,
      display_order: Number(editingProject.display_order) || 1,
    };

    try {
      let res;
      if (editingProject.id) {
        res = await adminFetch(`/projects/${editingProject.id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        res = await adminFetch("/projects", {
          method: "POST",
          body: JSON.stringify(body),
        });
      }

      if (res.ok) {
        setFormOpen(false);
        setEditingProject(null);
        fetchProjects();
      } else {
        const err = await res.json();
        alert(err.detail || "Failed to save project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await adminFetch(`/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bricolage font-medium mb-1">Portfolio Projects</h1>
          <p className="text-white/50 text-sm">Manage the case studies and projects rendered on the homepage archive.</p>
        </div>
        <button
          onClick={() => {
            setEditingProject({
              title: "",
              description: "",
              category: "deep-space",
              technologies: [],
              image_url: "",
              is_featured: true,
              display_order: projects.length + 1,
            });
            setFormOpen(true);
          }}
          className="bg-white hover:bg-neutral-200 text-black px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"
        >
          {/* @ts-expect-error */}
          <iconify-icon icon="solar:plus-outline" width="18"></iconify-icon>
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="text-white/40 font-mono text-sm">Loading projects data...</div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wider font-mono">
              <tr>
                <th className="px-6 py-4 font-medium">Order</th>
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Featured</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-white/40">{project.display_order}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-16 h-10 object-cover rounded-lg border border-white/10 shrink-0"
                      />
                      <div>
                        <span className="font-medium text-white block">{project.title}</span>
                        <span className="text-xs text-white/40 line-clamp-1 max-w-sm">
                          {(project.technologies || []).join(" / ")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-white/50">{project.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      project.is_featured 
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                        : "bg-neutral-500/10 text-neutral-400 border-neutral-500/20"
                    }`}>
                      {project.is_featured ? "Featured" : "Regular"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingProject(project);
                        setFormOpen(true);
                      }}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
                    >
                      {/* @ts-expect-error */}
                      <iconify-icon icon="solar:pen-linear" width="16"></iconify-icon>
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 hover:text-red-350 transition-all"
                    >
                      {/* @ts-expect-error */}
                      <iconify-icon icon="solar:trash-bin-trash-linear" width="16"></iconify-icon>
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-white/40 font-mono text-sm">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal */}
      {formOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 p-8 rounded-3xl w-full max-w-xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bricolage font-medium mb-6 text-white">
              {editingProject.id ? "Edit Project" : "Add Project"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Category</label>
                  <select
                    value={editingProject.category || "deep-space"}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  >
                    <option value="deep-space">AI & Auto (deep-space)</option>
                    <option value="orbital">Dev & Design (orbital)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Description</label>
                <textarea
                  required
                  rows={3}
                  value={editingProject.description || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={editingProject.image_url || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                    placeholder="/assets/image.webp"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Display Order</label>
                  <input
                    type="number"
                    required
                    value={editingProject.display_order || 0}
                    onChange={(e) => setEditingProject({ ...editingProject, display_order: Number(e.target.value) })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Technologies (Comma-separated)</label>
                <input
                  type="text"
                  required
                  value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(", ") : (editingProject.technologies || "")}
                  onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value as any })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  placeholder="React, Next.js, FastAPI, Stripe"
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={editingProject.is_featured || false}
                  onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                  className="rounded border-white/10 bg-black text-emerald-500 focus:ring-emerald-500/50"
                />
                <label htmlFor="is_featured" className="text-sm font-medium text-white/80">Featured project</label>
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
