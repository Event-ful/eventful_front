import { useQuery } from '@tanstack/react-query';
import { fetchGroupsApi } from '../api';
import { FetchGroupsResponse } from './type';

/*
 * 내가 속한 그룹 목록 조회 쿼리
 */
export const useFetchGroups = () => {
  return useQuery<FetchGroupsResponse, Error>({
    queryKey: ['groups'],
    queryFn: () => fetchGroupsApi(),
  });
};
