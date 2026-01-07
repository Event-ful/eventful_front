import { instance } from '@/shared/api/instance';

/**
 * 그룹 삭제 API
 * @param groupId - 그룹 ID
 */
export const deleteGroupApi = async (groupId: string): Promise<void> => {
  await instance.delete(`/api/event-group/${groupId}`);
};

