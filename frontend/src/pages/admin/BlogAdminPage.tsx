import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { Plus, Trash2, Edit } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publish_date: string;
}

export function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await apiClient.get('/blog/posts');
      setPosts(res.data.items);
    } catch (error) {
      console.error('Failed to fetch blog posts', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await apiClient.delete(`/blog/posts/${id}`);
        fetchPosts();
      } catch (error) {
        console.error('Failed to delete post', error);
      }
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} /> New Post
        </button>
      </div>

      <div className="bg-[#161616] rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-sm">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-medium">{post.title}</td>
                <td className="px-6 py-4 text-gray-400">{new Date(post.publish_date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-3">
                  <button className="text-blue-400 hover:text-blue-300">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No blog posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
