import React, { useState } from 'react';
import { 
  HeartHandshake, 
  MessageSquare, 
  Plus, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  Tag, 
  EyeOff, 
  Eye, 
  Bookmark, 
  Check, 
  Heart, 
  Flame, 
  ThumbsUp, 
  Pin,
  Share2,
  Filter
} from 'lucide-react';
import { ForumPost, ForumCategory, ForumComment } from '../types';

interface CommunityForumProps {
  posts: ForumPost[];
  onAddPost: (post: ForumPost) => void;
  onAddComment: (postId: string, comment: ForumComment) => void;
  onToggleReaction: (postId: string, reactionType: 'strength' | 'spoons' | 'helpful' | 'hug') => void;
  filterConditionTag?: string | null;
}

export const CommunityForum: React.FC<CommunityForumProps> = ({
  posts,
  onAddPost,
  onAddComment,
  onToggleReaction,
  filterConditionTag
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory>('All Channels');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  // New Post Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumCategory>('Newly Diagnosed');
  const [newAuthorName, setNewAuthorName] = useState('Alex Morgan');
  const [newConditionTag, setNewConditionTag] = useState("Hashimoto's & RA");
  const [newIsAnonymous, setNewIsAnonymous] = useState(false);
  const [newTagsInput, setNewTagsInput] = useState('');

  // Comment State
  const [commentText, setCommentText] = useState<{ [postId: string]: string }>({});
  const [commentIsAnon, setCommentIsAnon] = useState<{ [postId: string]: boolean }>({});

  const categories: ForumCategory[] = [
    'All Channels',
    'Newly Diagnosed',
    'Flare SOS & Coping',
    'Medications & Biologics',
    'Diet, Gut & AIP',
    'Mental Health & Spoonies',
    'Wins & Milestones'
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All Channels' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.authorCondition && post.authorCondition.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesConditionFilter = !filterConditionTag || 
      post.tags.some(t => t.toLowerCase().includes(filterConditionTag.toLowerCase())) ||
      (post.authorCondition && post.authorCondition.toLowerCase().includes(filterConditionTag.toLowerCase()));

    return matchesCategory && matchesSearch && matchesConditionFilter;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tags = newTagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(t => t.length > 0);

    const post: ForumPost = {
      id: `post-${Date.now()}`,
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      authorName: newIsAnonymous ? 'Anonymous Warrior' : newAuthorName.trim() || 'Community Member',
      authorHandle: newIsAnonymous ? 'spoonie_anon' : (newAuthorName.toLowerCase().replace(/\s+/g, '_') || 'spoonie'),
      authorCondition: newConditionTag.trim() || 'Autoimmune Overlap',
      isAnonymous: newIsAnonymous,
      timestamp: Date.now(),
      tags: tags.length > 0 ? tags : ['Support', 'ChronicIllness'],
      reactions: {
        strength: 1,
        spoons: 1,
        helpful: 0,
        hug: 0
      },
      comments: []
    };

    onAddPost(post);
    setShowCreateModal(false);
    setNewTitle('');
    setNewContent('');
    setNewTagsInput('');
  };

  const handleSendComment = (postId: string) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    const isAnon = commentIsAnon[postId] || false;
    const comment: ForumComment = {
      id: `comment-${Date.now()}`,
      postId,
      authorName: isAnon ? 'Anonymous Member' : 'Alex Morgan',
      authorHandle: isAnon ? 'spoonie_anon' : 'alex_m',
      isAnonymous: isAnon,
      conditionTag: 'Community Member',
      timestamp: Date.now(),
      content: text.trim(),
      likes: 0
    };

    onAddComment(postId, comment);
    setCommentText(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-6">
      {/* Forum Header Bento Card */}
      <section className="bento-glass p-6 sm:p-7 rounded-[32px] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 bento-lift-subtle">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-50/90 text-pink-700 text-xs font-bold uppercase tracking-wider border border-pink-100">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Safe & Empathetic Peer Support</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            ImmuneQ Community Forum & Shared Experiences
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
            A compassionate space to ask questions, share medication experiences, celebrate remission wins, and support fellow spoonies.
          </p>
        </div>

        <button
          id="create-forum-post-btn"
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-sm shrink-0 bento-lift-subtle"
        >
          <Plus className="w-4 h-4 text-pink-400" />
          <span>Post a Discussion</span>
        </button>
      </section>

      {/* Safety & Moderation Notice */}
      <div className="p-4 rounded-2xl bento-glass text-xs text-slate-600 flex items-center justify-between shadow-2xs bento-lift-subtle">
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Safe Community Guidelines:</strong> Be respectful and compassionate. Anonymous posting is supported. Peer experiences do not substitute professional medical care.
          </span>
        </div>
      </div>

      {/* Search & Channel Navigation Bento Container */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions by topic, medication (e.g. Humira, Prednisone), or diagnosis tag..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bento-glass text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 shadow-xs"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all bento-lift-subtle ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Discussions Feed */}
      <div className="space-y-4">
        {filteredPosts.map(post => {
          const isExpanded = activePostId === post.id;
          return (
            <div 
              key={post.id}
              className={`p-6 sm:p-7 rounded-[32px] bento-glass transition-all space-y-4 shadow-sm bento-lift ${
                post.isPinned ? 'border-sky-300 bg-sky-50/20' : ''
              }`}
            >
              {/* Post Meta */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3.5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    post.isAnonymous ? 'bg-slate-200 text-slate-700' : 'bg-sky-100 text-sky-700'
                  }`}>
                    {post.isAnonymous ? <EyeOff className="w-4 h-4" /> : post.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{post.authorName}</span>
                      {post.isAnonymous && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          Anonymous
                        </span>
                      )}
                      {post.isPinned && (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                          <Pin className="w-3 h-3" />
                          <span>Pinned</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                      <span>{post.authorCondition}</span>
                      <span>•</span>
                      <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100/90 text-slate-700 shrink-0 border border-slate-200/60">
                  {post.category}
                </span>
              </div>

              {/* Title & Body */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 hover:text-sky-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-white/90 border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors bento-lift-subtle">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Reaction Bar & Comments Toggle */}
              <div className="pt-3 border-t border-slate-100/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  {/* Strength */}
                  <button
                    onClick={() => onToggleReaction(post.id, 'strength')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all bento-lift-subtle ${
                      post.userReactions?.strength ? 'bg-purple-100 text-purple-800 font-bold' : 'bg-white/80 border border-slate-200 hover:bg-white text-slate-700'
                    }`}
                    title="Send Strength 💜"
                  >
                    <span>💜</span>
                    <span>{post.reactions.strength}</span>
                  </button>

                  {/* Spoon */}
                  <button
                    onClick={() => onToggleReaction(post.id, 'spoons')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all bento-lift-subtle ${
                      post.userReactions?.spoons ? 'bg-teal-100 text-teal-800 font-bold' : 'bg-white/80 border border-slate-200 hover:bg-white text-slate-700'
                    }`}
                    title="Extra Spoon 🥄"
                  >
                    <span>🥄</span>
                    <span>{post.reactions.spoons}</span>
                  </button>

                  {/* Helpful */}
                  <button
                    onClick={() => onToggleReaction(post.id, 'helpful')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all bento-lift-subtle ${
                      post.userReactions?.helpful ? 'bg-amber-100 text-amber-800 font-bold' : 'bg-white/80 border border-slate-200 hover:bg-white text-slate-700'
                    }`}
                    title="Helpful Insight 💡"
                  >
                    <span>💡</span>
                    <span>{post.reactions.helpful}</span>
                  </button>

                  {/* Hug */}
                  <button
                    onClick={() => onToggleReaction(post.id, 'hug')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all bento-lift-subtle ${
                      post.userReactions?.hug ? 'bg-pink-100 text-pink-800 font-bold' : 'bg-white/80 border border-slate-200 hover:bg-white text-slate-700'
                    }`}
                    title="Sending Hugs 🫂"
                  >
                    <span>🫂</span>
                    <span>{post.reactions.hug}</span>
                  </button>
                </div>

                <button
                  onClick={() => setActivePostId(isExpanded ? null : post.id)}
                  className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 bento-lift-subtle"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments.length} Comments {isExpanded ? '▲' : '▼'}</span>
                </button>
              </div>

              {/* Thread Comments Section */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-100/80 space-y-4 animate-in fade-in duration-150">
                  {/* Comments List */}
                  <div className="space-y-3">
                    {post.comments.length === 0 ? (
                      <p className="text-xs text-slate-400 italic py-2">
                        No responses yet. Be the first to share an encouraging word or tip!
                      </p>
                    ) : (
                      post.comments.map(c => (
                        <div key={c.id} className="p-4 rounded-2xl bento-glass-subtle space-y-1.5 bento-lift-subtle">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-slate-900">{c.authorName}</span>
                              {c.isAnonymous && (
                                <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md font-bold">Anon</span>
                              )}
                              <span className="text-slate-400">• {c.conditionTag}</span>
                            </div>
                            <span className="text-slate-400 text-[11px]">{new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                            {c.content}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Comment Input Composer */}
                  <div className="flex flex-col gap-2 pt-2">
                    <textarea
                      rows={2}
                      value={commentText[post.id] || ''}
                      onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                      placeholder="Write an empathetic reply or share your experience..."
                      className="w-full p-3.5 rounded-2xl bento-glass text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />

                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={commentIsAnon[post.id] || false}
                          onChange={(e) => setCommentIsAnon(prev => ({ ...prev, [post.id]: e.target.checked }))}
                          className="rounded text-sky-600 cursor-pointer"
                        />
                        <span>Reply Anonymously</span>
                      </label>

                      <button
                        onClick={() => handleSendComment(post.id)}
                        className="px-4 py-2 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs transition-all bento-lift-subtle"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bento-glass rounded-[32px] space-y-3">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No discussions found in this channel</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Be the first to create a discussion thread or select "All Channels".
            </p>
          </div>
        )}
      </div>

      {/* Create New Post Modal (Bento Rounded) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-[32px] max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in fade-in zoom-in-95 duration-150">
            
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-pink-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Community Thread
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Start a Discussion</h3>
                <p className="text-xs text-slate-400">Share your experience or ask questions in a safe space</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 sm:p-7 overflow-y-auto space-y-4 text-xs text-slate-800">
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">Channel / Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 cursor-pointer"
                >
                  {categories.filter(c => c !== 'All Channels').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Thread Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="E.g., Tips for managing morning stiffness during cold fronts?"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Story / Question</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share details of your situation, lab results, medications you are taking, or questions for the community..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Condition Tag (Optional)</label>
                  <input
                    type="text"
                    value={newConditionTag}
                    onChange={(e) => setNewConditionTag(e.target.value)}
                    placeholder="E.g., Hashimoto's, Lupus, RA"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Topic Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newTagsInput}
                    onChange={(e) => setNewTagsInput(e.target.value)}
                    placeholder="E.g., Humira, AIPDiet, FlareSOS"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Anonymous Posting Checkbox */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <EyeOff className="w-4 h-4 text-slate-600" />
                  <div>
                    <span className="font-bold text-slate-900 block">Post Anonymously</span>
                    <span className="text-[11px] text-slate-500">Your name and profile handle will be hidden.</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={newIsAnonymous}
                  onChange={(e) => setNewIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-2xl text-slate-600 font-bold hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all"
                >
                  Publish Discussion
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};
