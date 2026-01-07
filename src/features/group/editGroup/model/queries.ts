import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGroupApi } from '../api';
import { GroupDetailResponse, UpdateGroupRequest } from './type';

/**
 * 그룹 수정 뮤테이션
 * @param groupId - 그룹 ID
 */
export const useUpdateGroup = (groupId: string) => {
  const queryClient = useQueryClient();
  return useMutation<GroupDetailResponse, Error, UpdateGroupRequest>({
    mutationFn: (data: UpdateGroupRequest) => updateGroupApi(groupId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupDetail', groupId] });
    },
  });
};

