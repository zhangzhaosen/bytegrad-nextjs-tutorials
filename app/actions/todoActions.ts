'use server'

import prisma from '../lib/prisma'
import { cacheLife, cacheTag, revalidateTag, updateTag } from 'next/cache'
import { TodoSchema, Todo } from '../lib/type'

  const getErrorMesssage = (error: unknown): string =>{

  let message: string; 

  if(error instanceof Error){
    message = error.message
  }else if(error && typeof error == 'object' &&  "message" in error){
    message = String(error.message) 
  }else if(typeof error == 'string'){
    message = error
  }else{
    message = 'Something went wrong!'
  }
  return message
}
export async function addTodo(newTodo: Todo) {
  try {


    const result = TodoSchema.safeParse(newTodo)
    if(!result.success){
      let errorMessage = ''
      result.error.issues.map((issue) => {
        errorMessage = errorMessage + (issue.path[0] as string) + ': ' + issue.message + '. '
      })

      return {
        error: errorMessage
      }
    }

    // throw new Error('Server error xxx')

    const todo = await prisma.todo.create({
      data: result.data
    })

    // 第二个参数传自定义的缓存区域，不是default，是'todo-app'
    updateTag('todos')
    return todo

  } catch (error) {

    return {
      error: getErrorMesssage(error),
    }
  }


}

// ✅ Next.js官方推荐的模块级标签导出，这是revalidateTag能正常工作的最可靠方式
// 虽然是模块级，但我们可以把不同的功能拆分到不同的文件中来实现隔离
// 比如todos的操作放todoActions.ts，users的操作放userActions.ts，完全不会互相干扰

export async function getTodos() {
  'use cache'
  cacheTag('todos')
  cacheLife('days')

  const todos = await prisma.todo.findMany({
    orderBy: {
      id: 'desc',
    },
  })

  return todos
}

// 🎉 完美解决您的顾虑：即使以后添加其他函数，比如getUsers()，只需要为它们设置不同的标签
// export async function getUsers() {
//   'use cache'
//   cacheTag('users')  // 独立的标签，完全不会和todos互相干扰
//   cacheLife('days')
//   // ...其他查询逻辑
// }