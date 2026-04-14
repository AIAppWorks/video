import { RegisterForm } from './RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">VideoSaaS</h1>
          <p className="text-slate-400 text-sm">创建你的账号</p>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-slate-500 mt-6">
          已有账号？{' '}
          <a href="/login" className="text-indigo-400 hover:text-indigo-300">
            立即登录
          </a>
        </p>
      </div>
    </div>
  );
}
