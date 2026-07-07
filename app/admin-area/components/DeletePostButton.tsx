'use client';

import { deletePost } from '../../actions/postActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type DeletePostButtonProps = {
  postId: number;
};

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('确定要删除这个帖子吗？此操作无法撤销。')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePost(postId);
      router.refresh(); // 刷新页面以获取最新数据
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除帖子失败，请重试');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
    >
      {isDeleting ? '删除中...' : '删除'}
    </button>
  );
}