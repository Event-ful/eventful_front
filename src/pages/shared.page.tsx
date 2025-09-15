import { useState } from 'react';
import { Textarea } from '@/shared/ui/textarea';
import { Input } from '@/shared/ui/input';
import { Title1, Title2, Title3, Title4, Headline1, Headline2, Body1, Body2, Body4, Body5, Body4Emphasized, Body3Underlined, Button1, Button2, Button3 } from '@/shared/ui/typography';

export default function SharedComponents() {
  const [inputText, setInputText] = useState('');
  const [text, setText] = useState('');
  const [texts, setTexts] = useState('');
  const [nickname, setNickname] = useState('');
  const [status, setStatus] = useState<'success' | 'error'>();
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheck = () => {
    if (nickname.trim() === '') {
      setStatus('error');
      setErrorMessage('필수 입력 사항입니다.');
      return;
    }

    if (nickname.toLowerCase() === 'user1') {
      setStatus('error');
      setErrorMessage('중복된 닉네임입니다.');
    } else {
      setStatus('success');
      setErrorMessage('사용 가능한 닉네임입니다.');
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* 타이포그래피 */}
      <section className="space-y-4 p-4 border rounded bg-gray-50">
        <div className="space-y-2">
          <Title1>Title1</Title1>
          <Title2>Title2</Title2>
          <Title3>Title3</Title3>
          <Title4>Title4</Title4>

          <Headline1>Headline1</Headline1>
          <Headline2>Headline2</Headline2>

          <Body1>Body1</Body1>
          <Body2>Body2</Body2>
          <Body4>Body4</Body4>
          <Body5>Body5</Body5>
          <Body4Emphasized>Body4Emphasized</Body4Emphasized>
          <Body3Underlined>Body3Underlined</Body3Underlined>

          <Button1>Button1</Button1>
          <Button2>Button2</Button2>
          <Button3>Button3</Button3>
        </div>
      </section>

      {/* Input */}
      <section className="space-y-4 p-4 border rounded bg-gray-50">
        <Title1>Input 컴포넌트</Title1>
        <Input value={inputText} onChange={setInputText} placeholder="input 샘플 메세지를 입력하세요" maxLength={5} />
        <Input value={inputText} onChange={setInputText} placeholder="글자수 제한 없음" />
      </section>

      {/* Textarea  */}
      <section className="space-y-4 p-4 border rounded bg-gray-50">
        <Title1>Textarea 컴포넌트</Title1>

        <div>
          <Title3>기본 Textarea</Title3>
          <Textarea value={text} onChange={setText} placeholder="textarea 샘플 메세지를 입력하세요" maxLength={20} />
          <Textarea value={text} onChange={setText} placeholder="글자수 제한 없음" />
        </div>

        <div>
          <Title3>여러 줄 Textarea</Title3>
          <Textarea value={texts} onChange={setTexts} height="120px" placeholder="긴 내용을 입력하세요" />
        </div>

        <div>
          <Title3 className="mb-1">닉네임 입력 (필수)</Title3>
          <Textarea
            value={nickname}
            onChange={val => {
              setNickname(val);
              if (status === 'error' && errorMessage === '필수 입력 사항입니다.') {
                setErrorMessage('');
                setStatus(undefined);
              }
            }}
            placeholder="닉네임 입력 (user1: 중복된 닉네임)"
            status={status}
            errorMessage={status === 'error' ? errorMessage : undefined}
            successMessage={status === 'success' ? errorMessage : undefined}
          />
          <button onClick={handleCheck} className="mt-2 px-4 py-2 bg-blue-500 text-white-50 rounded">
            확인
          </button>
        </div>
      </section>
    </div>
  );
}
