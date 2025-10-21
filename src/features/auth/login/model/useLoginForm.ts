import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './queries';

/**
 * 로그인 폼의 상태와 이벤트 로직을 관리하는 커스텀 훅
 */
export const useLoginForm = (onClose: () => void) => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /** 이메일과 비밀번호 입력 여부에 따라 로그인 버튼 비활성화 */
  const isDisabled = !email || !password;

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          onClose();
          navigate('/');
        },
        onError: err => {
          console.error(err);
          alert('로그인 실패');
        },
      },
    );
  };

  /** 회원가입 페이지로 이동 */
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
    login,
    handleGoSignUp,
  };
};
