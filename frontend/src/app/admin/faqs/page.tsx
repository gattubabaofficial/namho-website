"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
}

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFAQ, setEditingFAQ] = useState<Partial<FAQ> | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/faqs/admin");
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFAQ?.question || !editingFAQ?.answer) return;

    const body = {
      question: editingFAQ.question,
      answer: editingFAQ.answer,
      category: editingFAQ.category || "General",
      display_order: Number(editingFAQ.display_order) || 1,
    };

    try {
      let res;
      if (editingFAQ.id) {
        res = await adminFetch(`/faqs/${editingFAQ.id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        res = await adminFetch("/faqs", {
          method: "POST",
          body: JSON.stringify(body),
        });
      }

      if (res.ok) {
        setFormOpen(false);
        setEditingFAQ(null);
        fetchFAQs();
      } else {
        const err = await res.json();
        alert(err.detail || "Failed to save FAQ");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await adminFetch(`/faqs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchFAQs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bricolage font-medium mb-1">Frequently Asked Questions</h1>
          <p className="text-white/50 text-sm">Manage the questions and answers displayed on the FAQ page.</p>
        </div>
        <button
          onClick={() => {
            setEditingFAQ({
              question: "",
              answer: "",
              category: "General",
              display_order: faqs.length + 1,
            });
            setFormOpen(true);
          }}
          className="bg-white hover:bg-neutral-200 text-black px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"
        >
          {/* @ts-expect-error */}
          <iconify-icon icon="solar:plus-outline" width="18"></iconify-icon>
          Add FAQ
        </button>
      </div>

      {loading ? (
        <div className="text-white/40 font-mono text-sm">Loading FAQs data...</div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wider font-mono">
              <tr>
                <th className="px-6 py-4 font-medium">Order</th>
                <th className="px-6 py-4 font-medium">Question</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-white/40">{faq.display_order}</td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="font-medium text-white block">{faq.question}</span>
                      <span className="text-xs text-white/40 line-clamp-1 max-w-lg">{faq.answer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-white/50">{faq.category}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2 text-white">
                    <button
                      onClick={() => {
                        setEditingFAQ(faq);
                        setFormOpen(true);
                      }}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
                    >
                      {/* @ts-expect-error */}
                      <iconify-icon icon="solar:pen-linear" width="16"></iconify-icon>
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 hover:text-red-350 transition-all"
                    >
                      {/* @ts-expect-error */}
                      <iconify-icon icon="solar:trash-bin-trash-linear" width="16"></iconify-icon>
                    </button>
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-white/40 font-mono text-sm">
                    No FAQs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal */}
      {formOpen && editingFAQ && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 p-8 rounded-3xl w-full max-w-xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bricolage font-medium mb-6 text-white">
              {editingFAQ.id ? "Edit FAQ" : "Add FAQ"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Category</label>
                  <input
                    type="text"
                    required
                    value={editingFAQ.category || ""}
                    onChange={(e) => setEditingFAQ({ ...editingFAQ, category: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                    placeholder="General, Billing, Technical"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Display Order</label>
                  <input
                    type="number"
                    required
                    value={editingFAQ.display_order || 0}
                    onChange={(e) => setEditingFAQ({ ...editingFAQ, display_order: Number(e.target.value) })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Question</label>
                <input
                  type="text"
                  required
                  value={editingFAQ.question || ""}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Answer</label>
                <textarea
                  required
                  rows={4}
                  value={editingFAQ.answer || ""}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                />
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
