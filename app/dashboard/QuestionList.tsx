import { getPosts } from '../actions/postActions';
import { Post } from '@prisma/client';

export default async function QuestionList() {
  const { posts, success } = await getPosts();

  if (!success || !posts || posts.length === 0) {
    return (
      <div className=" p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">帖子列表</h2>
        <p className="text-gray-500 text-center py-8">暂无帖子，快来发布第一条吧！</p>
      </div>
    );
  }

  // 格式化日期的函数
  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className=" p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">帖子列表 ({posts.length})</h2>
      <div className="space-y-4">
        {posts.map((post: Post) => (
          <div 
            key={post.id} 
            className="border-b border-gray-200 pb-4 last:border-b-0"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {post.create_user}
                </span>
                <span className="text-gray-500 text-sm">
                  {formatDateTime(post.datetime)}
                </span>
              </div>
              <span className="text-gray-400 text-xs">#{post.id}</span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}