'use client';

import Link from 'next/link';
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

export default function Sidebar() {
  const { user, isAuthenticated, isLoading, getPermissions } = useKindeBrowserClient();

  // 安全获取权限，处理getPermissions返回null的情况
  const permissions = getPermissions()?.permissions || [];

  // 获取用户首字母
  const getInitials = () => {
    if (!user) return '?';
    const firstName = user.family_name || '';
    const lastName = user.given_name || '';
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || '?';
  };

  const mainRoutes = [
    { path: '/', name: 'home' },
    {
      path: '/dashboard', name: 'Dashboard',
     requiredPermisions: ['ask:question']
    },
    {
      path: '/admin-area', name: 'Admin Area',
     requiredPermisions: ['ask:question', 'delete:question']
    },



  ]


  return (
    <aside className="w-64  min-h-screen p-4 flex flex-col justify-between">
      <nav className="space-y-2">
        {
          mainRoutes.map((route) => {

           
            // 安全检查权限，只有当用户拥有所有需要的权限时才显示链接
            const hasRequiredPermissions = !route.requiredPermisions || 
              route.requiredPermisions.every(permission => permissions.includes(permission));
            
            if(hasRequiredPermissions){


            return <Link
              key={route.path}
              href={route.path}
              className="block p-2 rounded  transition-colors"
            >
              {route.name}
            </Link>
          }
                      }
          )
        }

      </nav>

      {/* 用户信息区域 - 放在侧边栏底部 */}
      {!isLoading && isAuthenticated && user && (
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            {/* 用户头像/首字母 */}
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.email || '用户头像'}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {getInitials()}
              </div>
            )}

            <div className="flex-1 min-w-0">
              {/* 用户邮箱 */}
              {user.email && (
                <p className="text-sm text-gray-700 truncate">{user.email}</p>
              )}
            </div>
          </div>

          {/* 退出登录按钮 */}
          <LogoutLink className="w-full block text-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors">
            Log out
          </LogoutLink>
        </div>
      )}
    </aside>
  );
}