import { getPosts } from '../actions/postActions';
import DeletePostButton from './components/DeletePostButton';
import RequireAuth from '../dashboard/RequireAuth';
import { Suspense } from 'react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';


// 把帖子列表提取为单独的异步组件
async function PostList() {
  const { posts } = await getPosts();

  return (
    <div className=" rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className=" border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold ">ID</th>
              <th className="text-left px-6 py-4 text-sm font-semibold ">发布者</th>
              <th className="text-left px-6 py-4 text-sm font-semibold ">内容</th>
              <th className="text-left px-6 py-4 text-sm font-semibold ">发布时间</th>
              <th className="text-right px-6 py-4 text-sm font-semibold ">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id} className=" transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">#{post.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{post.create_user}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">{post.content}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(post.datetime).toLocaleString('zh-CN')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DeletePostButton postId={post.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  暂无帖子数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 加载状态组件
function PostListSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-12 text-center text-gray-500">
        <div className="animate-pulse">加载中...</div>
      </div>
    </div>
  );
}

export default async function AdminAreaPage() {
  const { isAuthenticated ,getPermission} = getKindeServerSession();
  const isLoggedIn = await isAuthenticated()
  if (!isLoggedIn) {
    redirect('/api/auth/login')
  }

  const requiredPermission = await getPermission('delete:question')
  if(!requiredPermission?.isGranted){
    redirect('/dashboard')
  }
  
  return (

    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">管理后台 - 帖子管理</h1>
      <Suspense fallback={<PostListSkeleton />}>
        <PostList />
      </Suspense>
    </div>

  );
}