import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';
import type { NextRequest } from 'next/server';

// Next.js 16 的 app/proxy.ts 替代了原来的middleware.ts
// 这是全局的代理中间件，所有请求都会经过这里

export const config = {
  matcher: [
    // 需要保护的路由
    '/dashboard/:path*',
    '/admin-area/:path*',
    '/dashboard',
    '/admin-area',
  ],
};

export default function proxy(request: NextRequest) {
  // 使用Kinde的withAuth来保护这些路由，未登录会自动重定向到登录页
  return withAuth(request);
}