
type Todo = {
  id: number, 
  content:string
}
export default function TodosComponent({todos}:{ todos:Todo[]} ) {
  return (
    <div className="w-full max-w-md">
        {todos.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">暂无todo，添加一个吧！</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li 
                key={todo.id}
                className="px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
              >
                <span className="text-gray-800 dark:text-white">{todo.content}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
  )
}