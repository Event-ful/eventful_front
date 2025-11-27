import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './queries';

/**
 * 로그인 폼의 상태와 이벤트 로직을 관리하는 커스텀 훅
 */
export const useLoginForm = (onClose: () => void, onLoginSuccess?: () => void) => {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoginLoading } = useLogin();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isDisabled = !email || !password || isLoginLoading;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;

    login(
      { email, password },
      {
        onSuccess: () => {
          onLoginSuccess?.();
          onClose();
          navigate('/');
        },
        onError: (err: Error) => {
          console.error(err);
          alert('로그인 실패: 이메일과 비밀번호를 확인해주세요.');
        },
      },
    );
  };

  const handleGoSignUp = () => {
    onClose();
    navigate('/sign_up');
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    isDisabled,
    isLoginLoading,
    handleLogin,
    handleGoSignUp,
  };
};
