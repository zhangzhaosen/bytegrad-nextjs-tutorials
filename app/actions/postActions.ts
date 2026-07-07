'use server';

import { cacheTag, updateTag } from 'next/cache';
import prisma from '../lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

// 创建新帖子
export async function createPost(create_user: string, content: string) {


  const {isAuthenticated} =  getKindeServerSession();
  const isLoggedIn = await isAuthenticated()
  if(!isLoggedIn){
    redirect('/api/auth/login')
  }
  
  try {
    const post = await prisma.post.create({
      data: {
        create_user,
        content,
      },
    });

     updateTag("posts");

    return { success: true, post };
  } catch (error) {
    console.error('创建帖子失败:', error);
    return { success: false, error: '创建帖子失败' };
  }
}

// 获取所有帖子
export async function getPosts() {
  "use cache";

  cacheTag("posts");

  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        datetime: 'desc',
      },
    });
    return { success: true, posts };
  } catch (error) {
    console.error('获取帖子失败:', error);
    return { success: false, error: '获取帖子失败', posts: [] };
  }
}

// 删除帖子
export async function deletePost(id: number) {
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
     updateTag("posts");
    return { success: true };
  } catch (error) {
    console.error('删除帖子失败:', error);
    return { success: false, error: '删除帖子失败' };
  }
}