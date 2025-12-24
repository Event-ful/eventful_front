import { ApiResponseSuccess } from '@/shared/api/type';

/*
 * 그룹 생성 요청 데이터
 */
export interface CreateGroupRequest {
  name: string;
  description: string;
  imageUrl: string;
}

/*
 * 그룹 생성 응답 데이터
 */
export interface CreateGroupData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

/*
 * 그룹 생성 응답 데이터
 */
export type CreateGroupResponse = ApiResponseSuccess<CreateGroupData>;
