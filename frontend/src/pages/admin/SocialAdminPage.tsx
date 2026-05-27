import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { Plus, Trash2, Link } from 'lucide-react';

interface SocialPost {
  id: string;
  platform: string;
  url: string;
  embed_code: string;
  is_active: boolean;
  display_order: number;
}

export function SocialAdminPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ platform: 'linkedin', url: '', embed_code: '' });

  const fetchPosts = async () => {
    try {
      const res = await apiClient.get('/social-posts');
      setPosts(res.data.items);
    } catch (error) {
      console.error('Failed to fetch posts', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/social-posts', formData);
      setIsAdding(false);
      setFormData({ platform: 'linkedin', url: '', embed_code: '' });
      fetchPosts();
    } catch (error) {
      console.error('Failed to add post', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await apiClient.delete(`/social-posts/${id}`);
        fetchPosts();
      } catch (error) {
        console.error('Failed to delete post', error);
      }
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Social Media Posts</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Post
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-[#161616] p-6 rounded-xl border border-white/5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Platform</label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full bg-[#222] border border-white/10 rounded-lg p-2"
            >
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Original URL (Optional)</label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full bg-[#222] border border-white/10 rounded-lg p-2"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Embed HTML Code</label>
            <textarea
              required
              value={formData.embed_code}
              onChange={(e) => setFormData({ ...formData, embed_code: e.target.value })}
              className="w-full bg-[#222] border border-white/10 rounded-lg p-2 h-32 font-mono text-sm"
              placeholder="<iframe src=... ></iframe>"
            />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Save Post
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-[#161616] p-6 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${post.platform === 'linkedin' ? 'bg-blue-500/10 text-blue-400' : 'bg-pink-500/10 text-pink-400'}`}>
                  {post.platform.toUpperCase()}
                </span>
                <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="text-sm text-gray-400 mb-4 truncate">
                <Link size={14} className="inline mr-1" />
                {post.url || 'No URL'}
              </div>
              <div className="bg-white/5 rounded p-2 text-xs text-gray-500 font-mono h-24 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#161616]" />
                {post.embed_code}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
