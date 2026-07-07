'use client';

import { useState } from 'react';
import { createPost } from '../actions/postActions';
//import { revalidatePath } from 'next/cache';

export default function AskQuestionForm() {
  const [content, setContent] = useState('');
  const [createUser, setCreateUser] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || !createUser.trim()) {
      alert('请填写完整信息');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await createPost(createUser, content);
      
      if (result.success) {
        // 重置表单
        setContent('');
        setCreateUser('');
        // 重新验证页面，刷新数据
        //revalidatePath('/dashboard');
        alert('帖子创建成功！');
      } else {
        alert('创建失败：' + result.error);
      }
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交过程中发生错误');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">发布新帖子</h2>
      
      <div className="mb-4">
        <label htmlFor="createUser" className="block text-sm font-medium text-gray-700 mb-1">
          创建者
        </label>
        <input
          type="text"
          id="createUser"
          value={createUser}
          onChange={(e) => setCreateUser(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入你的名字"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          帖子内容
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入帖子内容..."
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
      >
        {isSubmitting ? '发布中...' : '发布帖子'}
      </button>
    </form>
  );
}