import { GroupDetailData } from '@/features/group/fetchGroup/model/type';
import { UpdateGroupRequest } from './type';

/**
 * 그룹 수정 데이터에서 변경된 필드만 추출
 *
 * @param formData - 폼에서 입력된 데이터
 * @param processedImageUrl - 처리된 이미지 URL (업로드 완료된 URL 또는 기존 URL)
 * @param initialData - 초기 그룹 데이터
 * @returns 변경된 필드만 포함한 UpdateGroupRequest 객체
 */
export const getChangedFields = (
  formData: {
    groupName: string;
    groupDescription: string;
  },
  processedImageUrl: string | undefined,
  initialData: GroupDetailData,
): UpdateGroupRequest => {
  const updateData: UpdateGroupRequest = {};

  // 그룹 이름이 변경되었는지 확인
  if (formData.groupName.trim() !== initialData.groupName) {
    updateData.groupName = formData.groupName.trim();
  }

  // 그룹 설명이 변경되었는지 확인
  if (formData.groupDescription.trim() !== initialData.groupDescription) {
    updateData.groupDescription = formData.groupDescription.trim();
  }

  // 이미지가 변경되었는지 확인
  if (processedImageUrl && processedImageUrl !== initialData.groupImage) {
    updateData.groupImage = processedImageUrl;
  }

  return updateData;
};

/**
 * Data URL을 File 객체로 변환
 *
 * @param dataUrl - Data URL 문자열
 * @param filename - 파일명 (기본값: 'image.jpg')
 * @returns File 객체
 */
export const dataUrlToFile = async (dataUrl: string, filename = 'image.jpg'): Promise<File> => {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

/**
 * 이미지 URL이 Data URL인지 확인
 *
 * @param url - 이미지 URL
 * @returns Data URL 여부
 */
export const isDataUrl = (url: string): boolean => {
  return url.startsWith('data:');
};

