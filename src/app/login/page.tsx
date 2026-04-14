import { LoginForm } from './LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Video.AiAppWorks.cn</h1>
          <p className="text-slate-400 text-sm">登录你的账号</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-slate-500 mt-6">
          还没有账号？{' '}
          <a href="/register" className="text-indigo-400 hover:text-indigo-300">
            立即注册
          </a>
        </p>
      </div>
    </div>
  );
}
