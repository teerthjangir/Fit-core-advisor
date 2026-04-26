import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, User as UserIcon, Send } from 'lucide-react';
import clsx from 'clsx';

export default function Community({ currentUser }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Jenkins',
      time: '2 hours ago',
      content: "Just hit my 14-day workout streak! The personalized HIIT sessions have been amazing. Anyone else focusing on core strength this week?",
      likes: 24,
      replies: 5,
      isLiked: false
    },
    {
      id: 2,
      author: 'Mike Chen',
      time: '5 hours ago',
      content: "Looking for high-protein breakfast ideas that are quick to make. I'm struggling to hit my 120g target daily.",
      likes: 12,
      replies: 18,
      isLiked: false
    },
    {
      id: 3,
      author: 'Emma Thompson',
      time: '1 day ago',
      content: "Finally broke through my plateau! Tracking my medical conditions alongside my fitness goals really helped me understand my energy levels better.",
      likes: 89,
      replies: 12,
      isLiked: true
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      author: currentUser?.name || 'Anonymous User',
      time: 'Just now',
      content: newPost.trim(),
      likes: 0,
      replies: 0,
      isLiked: false
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const toggleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Community Forum</h1>
        <p className="text-slate-500">Connect with others, share your progress, and get advice.</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Create Post */}
        <div className="glass-card p-4 sm:p-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-3">
              <textarea 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your progress or ask a question..."
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none h-24"
              />
              <div className="flex justify-end">
                <button 
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="glass-card p-4 sm:p-6 transition-all hover:border-primary-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{post.author}</h3>
                  <p className="text-xs text-slate-500">{post.time}</p>
                </div>
              </div>
              
              <p className="text-slate-700 leading-relaxed mb-4">{post.content}</p>
              
              <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={clsx(
                    "flex items-center gap-1.5 text-sm font-medium transition-colors",
                    post.isLiked ? "text-primary-600" : "text-slate-500 hover:text-primary-600"
                  )}
                >
                  <ThumbsUp className={clsx("w-4 h-4", post.isLiked && "fill-current")} />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {post.replies} Replies
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
