
import Form from "./components/form";
import { getTodos } from './actions/todoActions';
import App from "./components/App";
import FormWithoutReactHookForm from "./components/FormWithoutReactHookForm";
import FormWithReactHookForm from "./components/FormWithReactHookForm";
import FormWithReactHookFormAndZod from "./components/FormWithReactHookFormAndZod";
import Logo from "./components/Logo";

type Todo = {
  id: number
  content: string
}

// 页面的缓存区域和revalidateTag的第二个参数一致，使用自定义的'todo-app'

// 纯服务器组件，每次都会调用getTodos，而getTodos自己有缓存控制
export default async function Home() {
  const todos = await getTodos()
 
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black min-h-screen py-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Todo List</h1>

      {/* <Form todos={todos} /> */}
      {/* <App /> */}
      {/* <FormWithoutReactHookForm /> */}
      {/* <FormWithReactHookForm /> */}
      <Logo />
      <FormWithReactHookFormAndZod />
      
    </div>
  );
}