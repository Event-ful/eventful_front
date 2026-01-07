import { ApiResponseSuccess } from '@/shared/api/type';

export interface GroupInfo {
  groupId: number;
  groupName: string;
  groupDescription: string;
  groupImageUrl: string;
  memberCount: number;
}

export type FetchGroupsResponse = ApiResponseSuccess<{ groups: GroupInfo[] }>;
