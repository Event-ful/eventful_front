import { instance } from './instance';
import { FileUploadResponse, FileUploadDirectory } from './type';

/*
 * 파일 업로드 API
 * @param file - 업로드할 파일
 * @param directory - 파일 업로드 디렉토리
 * @returns 파일 업로드 응답
 */
export const uploadFileApi = async (
  file: File,
  directory: FileUploadDirectory,
): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await instance.post<FileUploadResponse>(
    `/api/files/upload?directory=${directory}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};
