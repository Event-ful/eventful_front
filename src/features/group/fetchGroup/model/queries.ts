import { useQuery } from '@tanstack/react-query';
import { fetchGroupDetailApi } from '../api';
import { GroupDetailResponse } from './type';

/**
 * 그룹 상세 조회 쿼리
 * @param groupId - 그룹 ID
 */
export const useGroupDetail = (groupId: string) => {
  return useQuery<GroupDetailResponse, Error>({
    queryKey: ['groupDetail', groupId],
    queryFn: () => fetchGroupDetailApi(groupId),
    enabled: !!groupId,
  });
};

/**
 * 그룹별 이벤트 목록 조회 쿼리
 * @param groupId - 그룹 ID
 */
// export const useGroupEvents = (groupId: string) => {
//   return useQuery<GroupEventsResponse, Error>({
//     queryKey: ['groupEvents', groupId],
//     queryFn: () => fetchGroupEventsApi(groupId),
//     enabled: !!groupId,
//   });
// };
