import { ApiResponseSuccess } from '@/shared/api/type';
import { GroupDetailData } from '@/features/group/fetchGroup/model/type';

/**
 * 그룹 수정 요청 타입
 */
export interface UpdateGroupRequest {
  groupName?: string;
  groupDescription?: string;
  groupImage?: string;
}

export type GroupDetailResponse = ApiResponseSuccess<GroupDetailData>;

