import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GroupBanner from './ui/GroupBanner';
import EditGroupModal from '@/features/group/editGroup/ui/EditGroupModal';
import EventCard from '@/widgets/event/eventCard';
import DateIcon from '@/shared/ui/date';
import { Title1 } from '@/shared/ui/typography';
import { useGroupDetail } from './model/queries';
import { useUpdateGroup } from '@/features/group/editGroup/model/queries';
import { useDeleteGroup } from '@/features/group/deleteGroup/model/queries';
import { useUploadFile } from '@/features/group/createGroup/model/queries';
import EmptyState from '@/shared/ui/emptyState';
import { getChangedFields, dataUrlToFile, isDataUrl } from '@/features/group/editGroup/model/utils';

/**
 * 그룹 상세 페이지 컴포넌트
 */
export default function FetchGroupDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: groupData, isLoading: isGroupLoading, isError: isGroupError } = useGroupDetail(id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { mutateAsync: updateGroup, isPending: isUpdating } = useUpdateGroup(id || '');
  const { mutateAsync: deleteGroup, isPending: isDeleting } = useDeleteGroup();
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile('GROUP_IMAGES');

  // 다가오는 일정 목 데이터 (그룹 별 이벤트 리스트 조회 api 연동 후 삭제!)
  const mockEvents = [
    {
      eventId: '1',
      date: '2026-01-15',
      eventName: '동산 사이드 프로젝트 쫑파티',
      startTime: '오후 17시 30분',
      location: '사당역 5번 출구 앞',
      isParticipating: true,
    },
    {
      eventId: '2',
      date: '2026-01-16',
      eventName: '동산 사이드 프로젝트 쫑파티',
      startTime: '오후 17시 30분',
      location: '사당역 5번 출구 앞',
      isParticipating: false,
    },
    {
      eventId: '3',
      date: '2026-01-20',
      eventName: '개발팀 온라인 회의',
      startTime: '오전 11시 30분',
      location: '디스코드',
      isParticipating: true,
    },
    {
      eventId: '4',
      date: '2026-01-22',
      eventName: '팀 빌딩 활동',
      startTime: '오후 14시 00분',
      location: '강남역 근처',
      isParticipating: false,
    },
  ];

  const events = mockEvents;

  const handleShareInviteLink = () => {
    console.log('초대 링크 공유');
  };

  const handleCreateEvent = () => {
    console.log('새 이벤트 만들기');
  };

  const handleEditGroup = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveGroup = async (data: {
    groupName: string;
    groupDescription: string;
    groupImage?: string;
  }) => {
    if (!groupData?.data) return;

    try {
      const initialData = groupData.data;
      let processedImageUrl = data.groupImage;

      // 새로운 이미지 파일이 업로드된 경우 (Data URL이면 새 파일)
      if (data.groupImage && isDataUrl(data.groupImage)) {
        const file = await dataUrlToFile(data.groupImage, 'group-image.jpg');
        const uploadResult = await uploadFile(file);
        processedImageUrl = uploadResult.data.fileUrl;
      }

      // 변경된 필드만 추출
      const updateData = getChangedFields(
        {
          groupName: data.groupName,
          groupDescription: data.groupDescription,
        },
        processedImageUrl,
        initialData,
      );

      // 변경된 필드가 있을 때만 수정 API 호출
      if (Object.keys(updateData).length > 0) {
        await updateGroup(updateData);
      }

      setIsEditModalOpen(false);
    } catch (error) {
      console.error('그룹 수정 실패:', error);
      alert('그룹 수정에 실패했습니다.');
    }
  };

  const handleDeleteGroup = async () => {
    if (!id) return;

    if (window.confirm('그룹을 삭제하시겠습니까?')) {
      try {
        await deleteGroup(id);
        navigate('/');
      } catch (error) {
        console.error('그룹 삭제 실패:', error);
        alert('그룹 삭제에 실패했습니다.');
      }
    }
  };

  const handleLeaveGroup = () => {
    if (window.confirm('그룹에서 나가시겠습니까?')) {
      console.log('그룹 나가기');
    }
  };

  const handleEventClick = (eventId: string) => {
    console.log('이벤트 클릭:', eventId);
  };

  if (isGroupLoading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-black-300">로딩 중...</div>
      </div>
    );
  }

  if (isGroupError || !groupData) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-red-400">그룹 정보를 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  return (
    <>
      {/* 그룹 수정 모달 */}
      {groupData?.data && (
        <EditGroupModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialGroupName={groupData.data.groupName}
          initialGroupDescription={groupData.data.groupDescription}
          initialGroupImage={groupData.data.groupImage}
          onSave={handleSaveGroup}
          isSaving={isUpdating || isUploading}
        />
      )}

      <div className="w-full p-6">
        <div className="flex gap-10">
          {/* 그룹 배너 */}
          <div className="flex-1">
            <GroupBanner
              groupImage={groupData.data?.groupImage}
              groupName={groupData.data?.groupName}
              groupDescription={groupData.data?.groupDescription}
              memberCount={groupData.data?.memberCount || 0}
              members={groupData.data?.groupMembers || []}
              isLeader={groupData.data?.leader || false}
              isDeleting={isDeleting}
              onShareInviteLink={handleShareInviteLink}
              onCreateEvent={handleCreateEvent}
              onEditGroup={handleEditGroup}
              onDeleteGroup={handleDeleteGroup}
              onLeaveGroup={handleLeaveGroup}
            />
          </div>

          {/* 다가오는 일정 */}
          <div className="w-[450px] flex-shrink-0">
            <section>
              <Title1 className="mb-6">다가오는 일정</Title1>

              {events.length === 0 ? (
                <EmptyState message="다가오는 일정이 없어요." />
              ) : (
                <div className="space-y-3">
                  {events.map((event, index) => (
                    <div key={event.eventId} className="flex gap-3 items-start relative">
                      <div className="flex flex-col items-center relative pt-1">
                        <DateIcon date={event.date} index={index} />
                        {index < events.length - 1 && (
                          <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2 w-[1px] h-[40px] bg-black-200"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <EventCard
                          eventId={event.eventId}
                          eventName={event.eventName}
                          startTime={event.startTime}
                          location={event.location}
                          isParticipating={event.isParticipating}
                          onEventCardClick={() => handleEventClick(event.eventId)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
