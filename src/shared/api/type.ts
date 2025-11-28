/*
 * API 응답 성공 타입
 */
export interface ApiResponseSuccess<T> {
  statusCode: number;
  data: T;
}

/*
 * API 응답 에러 타입
 */
export interface ApiResponseError {
  statusCode: number;
  errorMessage: string;
  divisionCode: string;
}

export type ApiResponseFormat<T> = ApiResponseSuccess<T> | ApiResponseError;

/*
 * 파일 업로드 디렉토리
 */
export type FileUploadDirectory = 'GENERAL' | 'GROUP_IMAGES' | 'PROFILE_IMAGES';

/*
 * 파일 업로드 데이터 타입
 */
export interface FileUploadData {
  fileName: string;
  storedFileName: string;
  fileUrl: string;
  contentType: string;
  fileSize: number;
  uploadedAt: string;
}

export type FileUploadResponse = ApiResponseSuccess<FileUploadData>;
