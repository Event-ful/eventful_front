import { instance } from '@/shared/api/instance';
import { CreateGroupRequest, CreateGroupResponse } from '../model/type';

/*
 * 그룹 생성 API
 * @param data - 그룹 생성 요청 데이터
 * @returns 그룹 생성 응답 데이터
 */
export const createGroupApi = async (data: CreateGroupRequest): Promise<CreateGroupResponse> => {
  const res = await instance.post<CreateGroupResponse>('/api/event-group', data);
  return res.data;
};
