import { useState, useRef, useEffect } from 'react';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Button1, Title1, Headline2 } from '@/shared/ui/typography';
import Modal from '@/shared/ui/modal';
import CameraIcon from '@/assets/svg/camera.svg';
import XIcon from '@/assets/svg/X.svg';

interface EditGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGroupName: string;
  initialGroupDescription: string;
  initialGroupImage?: string;
  onSave: (data: { groupName: string; groupDescription: string; groupImage?: string }) => void;
  isSaving?: boolean;
}

/**
 * 그룹 정보 수정 모달 컴포넌트
 */
export default function EditGroupModal({
  isOpen,
  onClose,
  initialGroupName,
  initialGroupDescription,
  initialGroupImage,
  onSave,
  isSaving = false,
}: EditGroupModalProps) {
  const [groupName, setGroupName] = useState(initialGroupName);
  const [groupDescription, setGroupDescription] = useState(initialGroupDescription);
  const [imagePreview, setImagePreview] = useState<string>(initialGroupImage || '');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 초기값이 변경되면 상태 업데이트
  useEffect(() => {
    if (isOpen) {
      setGroupName(initialGroupName);
      setGroupDescription(initialGroupDescription);
      setImagePreview(initialGroupImage || '');
      setImageFile(null);
    }
  }, [isOpen, initialGroupName, initialGroupDescription, initialGroupImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(initialGroupImage || '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    if (!groupName.trim() || !groupDescription.trim()) {
      return;
    }
    // 이미지가 변경되었는지 확인
    const isImageChanged = imagePreview !== initialGroupImage;
    onSave({
      groupName: groupName.trim(),
      groupDescription: groupDescription.trim(),
      // 이미지가 변경되지 않았으면 기존 이미지 URL을 그대로 전달
      groupImage: isImageChanged ? imagePreview : initialGroupImage,
    });
  };

  const handleCancel = () => {
    setGroupName(initialGroupName);
    setGroupDescription(initialGroupDescription);
    setImagePreview(initialGroupImage || '');
    setImageFile(null);
    onClose();
  };

  const isFormValid = groupName.trim().length > 0 && groupDescription.trim().length > 0;

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} maxWidth="600px">
      {/* 헤더 */}
      <div className="flex items-center justify-between pb-6 border-b border-black-200">
        <Headline2>그룹 정보 수정</Headline2>
        <button
          onClick={handleCancel}
          className="w-8 h-8 flex items-center justify-center hover:bg-white-100 rounded-lg transition-colors"
          aria-label="닫기"
        >
          <img src={XIcon} alt="닫기" className="w-5 h-5" />
        </button>
      </div>

      {/* 본문 */}
      <div className="pt-6 space-y-5">
        {/* 그룹 이름 */}
        <div>
          <Title1 className="mb-2">그룹 이름</Title1>
          <Input
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            placeholder="그룹명을 입력하세요."
            maxLength={15}
          />
        </div>

        {/* 그룹 설명 */}
        <div>
          <Title1 className="mb-2">그룹 설명</Title1>
          <Textarea
            value={groupDescription}
            onChange={setGroupDescription}
            height="100px"
            placeholder="그룹을 소개해주세요."
            maxLength={200}
          />
        </div>

        {/* 그룹 이미지 */}
        <div>
          <Title1 className="mb-2">그룹 사진</Title1>
          <div className="relative">
            <div
              onClick={handleImageAreaClick}
              className="w-full h-[200px] border-2 border-dashed border-black-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-black-300 transition-colors"
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview}
                    alt="그룹 사진 미리보기"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleImageRemove();
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    aria-label="이미지 제거"
                  >
                    <img src={XIcon} alt="제거" className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <img src={CameraIcon} alt="카메라" className="w-12 h-12 mb-2" />
                  <p className="text-black-300 text-center text-sm">
                    그룹을 대표하는 사진을 업로드하세요
                    <br />
                    최대 10mb 까지 지원됩니다.
                  </p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <div className="flex gap-3 pt-6 border-t border-black-200">
        <button
          onClick={handleSave}
          disabled={!isFormValid || isSaving}
          className={`flex-1 py-3 rounded-lg transition-colors ${
            isFormValid && !isSaving
              ? 'bg-green-400 text-white-50 hover:bg-green-500'
              : 'bg-black-200 text-black-300 cursor-not-allowed'
          }`}
        >
          <Button1>{isSaving ? '저장 중...' : '저장'}</Button1>
        </button>
        <button
          onClick={handleCancel}
          disabled={isSaving}
          className="flex-1 py-3 rounded-lg bg-white-50 border border-black-200 text-black-400 hover:bg-white-100 transition-colors disabled:opacity-50"
        >
          <Button1>취소</Button1>
        </button>
      </div>
    </Modal>
  );
}

