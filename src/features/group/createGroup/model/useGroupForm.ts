import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUploadFile, useCreateGroup } from './queries';
import { createImagePreview } from './utils';

/**
 * 그룹 생성 폼 상태 및 로직을 관리하는 훅
 * @returns {Object} GroupForm 컴포넌트에서 사용하는 상태와 함수
 */
export const useGroupForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile('GROUP_IMAGES');
  const { mutateAsync: createGroup, isPending: isCreating } = useCreateGroup();

  /**
   * 이미지 파일 업로드 핸들러
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - 파일 입력 이벤트
   */
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      try {
        const preview = await createImagePreview(file);
        setImagePreview(preview);
      } catch (error) {
        console.error('이미지 미리보기 생성 실패:', error);
      }
    }
  };

  /**
   * 이미지 업로드 영역 클릭 핸들러
   */
  const handleImageAreaClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * 이미지 제거 핸들러
   */
  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * 그룹 생성 제출 핸들러
   */
  const submitGroup = async () => {
    if (!isFormValid) return;

    try {
      let imageUrl = '';
      // 이미지 파일이 있으면 먼저 업로드
      if (imageFile) {
        const uploadResult = await uploadFile(imageFile);
        imageUrl = uploadResult.data.fileUrl;
      }
      // 그룹 생성
      const result = await createGroup({
        name: name,
        description: description,
        imageUrl,
      });
      const groupId = result.data.id;
      if (groupId) {
        navigate(`/group/${groupId}`);
      }
    } catch (error) {
      console.error('그룹 생성 실패:', error);
    }
  };

  /**
   * 폼 유효성 검사
   */
  const isFormValid = name.trim().length > 0 && description.trim().length > 0;
  const isSubmitting = isUploading || isCreating;

  return {
    name,
    description,
    imageFile,
    imagePreview,
    fileInputRef,
    isFormValid,
    isSubmitting,
    setName,
    setDescription,
    handleImageUpload,
    handleImageAreaClick,
    handleImageRemove,
    submitGroup,
  };
};
