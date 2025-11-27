import { Body1, Body3Underlined, Button2, Headline1 } from '@/shared/ui/typography';
import { Input } from '@/shared/ui/input';
import { useLoginForm } from '../model/useLoginForm';

interface LoginFormProps {
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginForm({ onClose, onLoginSuccess }: LoginFormProps) {
  const { email, password, setEmail, setPassword, isDisabled, isLoginLoading, handleLogin, handleGoSignUp } =
    useLoginForm(onClose, onLoginSuccess);

  return (
    <div
      className="fixed inset-0 bg-black-300 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white-50 rounded-lg w-[400px] py-[40px] px-[30px] border-black-300 center flex-col"
        onClick={e => e.stopPropagation()}
      >
        <Headline1 className="text-black-400 mb-[10px]">로그인</Headline1>
        <Body1 className="text-black-300 mb-[30px]">계정에 로그인하여 시작하세요</Body1>

        <form className="flex flex-col gap-[14px] w-full">
          <Input
            type="text"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isLoginLoading}
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={isLoginLoading}
          />
        </form>

        <button
          type="submit"
          onClick={handleLogin}
          disabled={isDisabled}
          className={`w-full py-[10px] mt-[30px] mb-[26px] rounded-md text-white-50 transition
            ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-400 hover:bg-green-500'}`}
        >
          <Button2>{isLoginLoading ? '로그인 중...' : '로그인'}</Button2>
        </button>

        <button onClick={handleGoSignUp} disabled={isLoginLoading}>
          <Body3Underlined>회원가입</Body3Underlined>
        </button>
      </div>
    </div>
  );
}
