import { ApiResponseSuccess } from '@/shared/api/type';

/**
 * 그룹 멤버 정보 타입
 */
export interface GroupMember {
  memberId: number;
  memberName: string;
  leader: boolean;
}

/**
 * 그룹 상세 정보 응답 타입
 */
export interface GroupDetailData {
  groupName: string;
  groupDescription: string;
  memberCount: number;
  joinCode: string;
  groupPassword: string;
  groupMembers: GroupMember[];
  leader: boolean;
  groupImage?: string;
}

export type GroupDetailResponse = ApiResponseSuccess<GroupDetailData>;

/**
 * 그룹별 이벤트 데이터 타입
 */
export interface GroupEventData {
  eventId: string;
  date: string; // 2026-01-01 형식
  eventName: string;
  startTime: string; // 오후(오전) HH시 MM분 형식
  location: string;
  isParticipating: boolean;
}

export type GroupEventsResponse = ApiResponseSuccess<GroupEventData[]>;
