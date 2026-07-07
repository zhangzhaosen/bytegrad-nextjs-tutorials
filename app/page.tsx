
import { getTodos } from './actions/todoActions';
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

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

      {/* <Form todos={todos} /> */}
      {/* <App /> */}
      {/* <FormWithoutReactHookForm /> */}
      {/* <FormWithReactHookForm /> */}
      {/* <Logo />
      <FormWithReactHookFormAndZod /> */}
      {/* <ReactHookForm /> */}
      {/* <FileStack /> */}
      <main className="flex flex-1 items-center justify-center">
        <section className="text-center max-w-xl px-6">
          <h1 className="text-6xl font-bold leading-tight">
            Welcome to
            <br />
            FreeTechSupport
          </h1>

          <p className="mt-6 text-2xl">
            Tech problems? Log in and ask our experts
            <br />
            for free!
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <LoginLink

              className="rounded-md bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition"
            >
              Login
            </LoginLink>

            <RegisterLink

              className="rounded-md bg-zinc-500 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-400 transition"
            >
              Sign up
            </RegisterLink>
          </div>
        </section>
      </main>

    </div>

  );
}