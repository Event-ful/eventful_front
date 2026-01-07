import { useMutation } from '@tanstack/react-query';
import { deleteGroupApi } from '../api';

/**
 * 그룹 삭제 뮤테이션
 */
export const useDeleteGroup = () => {
  return useMutation<void, Error, string>({
    mutationFn: (groupId: string) => deleteGroupApi(groupId),
  });
};

