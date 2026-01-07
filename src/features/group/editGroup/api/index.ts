import { instance } from '@/shared/api/instance';
import { GroupDetailResponse, UpdateGroupRequest } from '../model/type';

/**
 * 그룹 수정 API
 * @param groupId - 그룹 ID
 * @param data - 수정할 그룹 정보
 */
export const updateGroupApi = async (
  groupId: string,
  data: UpdateGroupRequest,
): Promise<GroupDetailResponse> => {
  const response = await instance.put<GroupDetailResponse>(`/api/event-group/${groupId}`, data);
  return response.data;
};

