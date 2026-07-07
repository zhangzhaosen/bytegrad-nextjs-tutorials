
import { Suspense } from 'react';
import PostContent from '../PostContent';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <main className="px-7 pt-24 text-center">
      <Suspense fallback={<div className="text-xl">loading..</div>}>
        <PostContent params={params} />
      </Suspense>
    </main>
  );
}