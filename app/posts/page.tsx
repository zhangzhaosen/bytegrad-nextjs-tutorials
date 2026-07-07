import { Suspense } from 'react';
import PostList from './PostList';

export default function PostsPage() {
  return (
    <main className="px-7 pt-24 text-center">
      <h1 className="text-5xl font-semibold mb-7">Posts List</h1>
      
      <Suspense fallback={<div className="text-xl">loading..</div>}>
        <PostList />
      </Suspense>
    </main>
  );
}