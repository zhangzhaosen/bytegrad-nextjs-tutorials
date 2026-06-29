
'use client'
import { useTransition, useRef, useOptimistic } from 'react'
import { addTodo } from '../actions/todoActions'
import TodosComponent from './TodosComponent'
import { Todo } from '@prisma/client'

export default function Form({ todos }: { todos: Todo[] }) {
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null) // ✅ 使用useRef引用表单，符合React最佳实践

  const [optimisticTodos, setOptimisticTodos] = useOptimistic<Todo[], Todo>(
    todos,  // 传入从props接收的初始todos，而不是未定义的todos
    (prevTodos, newTodo) => {
      // 第二个参数的类型是我们传入的第二个泛型参数Todo，类型匹配
      return [...prevTodos, newTodo]
    }
  )
  // Next.js Server Actions推荐的form action用法
  // 直接在form的action属性中使用服务器动作，Next.js会自动处理表单提交
  const formAction = async (formData: FormData) => {
    const content = formData.get('content') as string
    if (!content?.trim()) return

    // ✅ 使用ref重置表单，避免直接操作DOM
    formRef.current?.reset()

    startTransition(async () => {
      try {
        setOptimisticTodos( { id: Date.now(), content } as Todo)
        await addTodo(content)
        // 服务端会自动刷新，客户端什么都不用做
      } catch (error) {
        console.error('Failed to add todo:', error)
      }
    })
  }

  return (
    <>
      <form ref={formRef} action={formAction} className="flex gap-2 mt-8 mb-2">
        <input
          type="text"
          name="content"  // name属性必须，formData才能获取到值
          placeholder="添加新的todo..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          disabled={isPending}
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
        >
          {isPending ? '添加中...' : '添加'}
        </button>
      </form>
      <TodosComponent todos={optimisticTodos} />
    </>
  );
}