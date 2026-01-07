import { instance } from '@/shared/api/instance';
import { FetchGroupsResponse } from '../model/type';

/*
 * 내가 속한 그룹 목록 조회 API
 * @returns 그룹 목록 응답 데이터
 */
export const fetchGroupsApi = async (): Promise<FetchGroupsResponse> => {
  const res = await instance.get<FetchGroupsResponse>('/api/event-group');
  return res.data;
};
