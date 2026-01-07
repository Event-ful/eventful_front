import { instance } from '@/shared/api/instance';
import { GroupDetailResponse } from '../model/type';

/**
 * 그룹 상세 정보 조회 API
 * @param groupId - 그룹 ID
 */
export const fetchGroupDetailApi = async (groupId: string): Promise<GroupDetailResponse> => {
  const response = await instance.get<GroupDetailResponse>(`/api/event-group/${groupId}`);
  return response.data;
};

/**
 * 그룹별 이벤트 목록 조회 API
 * @param groupId - 그룹 ID
 */
// export const fetchGroupEventsApi = async (groupId: string): Promise<GroupEventsResponse> => {
//   const response = await instance.get<GroupEventsResponse>(`/groups/${groupId}/events`);
//   return response.data;
// };
