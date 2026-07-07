import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}


// 这是一个服务器组件，包含数据获取逻辑
export default async function PostList() {


  await new Promise(resolve => setTimeout(resolve, 3000));

  //const randomNum = Math.random()* 10 + 1
  const randomNum = 5
  // 一次fetch请求获取5个posts
  const response = await fetch(
    `https://dummyjson.com/posts?limit=${randomNum}`,
    {
      cache: 'force-cache'
    }
  );
  
  const data: PostsResponse = await response.json();
  const posts = data.posts;

  return (
    <div className="max-w-[700px] mx-auto space-y-4">
      {posts.map((post) => (
        <Link 
          key={post.id} 
          href={`/post/${post.id}`}
          className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-medium text-blue-600 hover:underline">
            {post.title}
          </h2>
        </Link>
      ))}
    </div>
  );
}