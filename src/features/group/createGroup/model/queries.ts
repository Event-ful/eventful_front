import { useMutation } from '@tanstack/react-query';
import { createGroupApi } from '../api';
import { CreateGroupRequest, CreateGroupResponse } from './type';
import { uploadFileApi } from '@/shared/api/fileUpload';
import { FileUploadResponse, FileUploadDirectory } from '@/shared/api/type';

/*
 * 파일 업로드 API
 * @param directory - 파일 업로드 디렉토리
 * @returns 파일 업로드 응답
 */
export const useUploadFile = (directory: FileUploadDirectory) =>
  useMutation<FileUploadResponse, Error, File>({
    mutationFn: (file: File) => uploadFileApi(file, directory),
    onError: (err: Error) => {
      console.error('파일 업로드 에러:', err);
    },
  });

/*
 * 그룹 생성 API
 * @returns 그룹 생성 응답
 */
export const useCreateGroup = () =>
  useMutation<CreateGroupResponse, Error, CreateGroupRequest>({
    mutationFn: (data: CreateGroupRequest) => createGroupApi(data),
    onSuccess: () => {
      console.log('그룹 생성 완료');
    },
    onError: (err: Error) => {
      console.error('그룹 생성 에러:', err);
    },
  });
