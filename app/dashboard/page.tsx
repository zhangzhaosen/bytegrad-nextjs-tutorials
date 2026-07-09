
import AskQuestionForm from './AskQuestionForm';
import QuestionList from './QuestionList';
import RequireAuth from './RequireAuth';
import ProtectedData from './protectedData';


export default function DashboardPage() {
  return (
    <RequireAuth>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">仪表盘 - 帖子管理</h1>
        <ProtectedData />
        <AskQuestionForm />
        <QuestionList />
      </div>
    </RequireAuth>
  );
}