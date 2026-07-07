import SyntaxHighlighter from "react-syntax-highlighter";

interface PostContentProps {
  params: {
    id: string;
  };
}

interface PostData {
  title: string;
  body: string;
  id: number;
}

// 这是一个服务器组件，包含数据获取逻辑
export default async function PostContent({ params }: PostContentProps) {
  // 模拟延迟，方便查看loading效果
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const { id } = await params;
  const response = await fetch(
    `https://dummyjson.com/posts/${id}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  const data: PostData = await response.json();
  console.log('post id data', data);

  return (
    <>
      <h1 className="text-5xl font-semibold mb-7">
        {data.title}
      </h1>

      <p className="max-w-[700px] mx-auto">
        {data.body}
      </p>

      <SyntaxHighlighter className="text-left">
        {`function() {
  return "Hello World!";
}`}
      </SyntaxHighlighter>
    </>
  );
}