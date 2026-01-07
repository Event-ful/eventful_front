import { useState, useRef, useEffect } from 'react';
import { Body2, Headline1, Button1 } from '@/shared/ui/typography';
import LinkIcon from '@/assets/svg/link.svg';
import DotsIcon from '@/assets/svg/dots.svg';
import DefaultGroupImage from '@/assets/img/group.png';
import MemberAvatars from '@/widgets/group/memberAvatars';

interface GroupBannerProps {
  groupImage?: string;
  groupName: string;
  groupDescription: string;
  memberCount: number;
  members: Array<{
    memberId: number;
    memberName: string;
    leader: boolean;
  }>;
  isLeader: boolean;
  isDeleting?: boolean;
  onShareInviteLink?: () => void;
  onCreateEvent?: () => void;
  onEditGroup?: () => void;
  onDeleteGroup?: () => void;
  onLeaveGroup?: () => void;
}

/**
 * 그룹 배너 컴포넌트
 *
 * @description
 * 그룹 이미지와 액션 버튼들을 포함하는 배너 컴포넌트입니다.
 * 오른쪽 위의 점 세개 아이콘을 클릭하면 드롭다운 메뉴가 표시됩니다.
 * isLeader가 true면 수정/삭제가 보이고, false면 그룹 나가기만 보입니다.
 */
export default function GroupBanner({
  groupImage,
  groupName,
  groupDescription,
  members,
  isLeader = false,
  isDeleting = false,
  onShareInviteLink,
  onCreateEvent,
  onEditGroup,
  onDeleteGroup,
  onLeaveGroup,
}: GroupBannerProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditClick = () => {
    setIsMenuOpen(false);
    onEditGroup?.();
  };

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    onDeleteGroup?.();
  };

  const handleLeaveClick = () => {
    setIsMenuOpen(false);
    onLeaveGroup?.();
  };

  return (
    <div className="bg-white-50 rounded-xl shadow-md border border-black-200 overflow-hidden">
      {/* 그룹 이미지 영역 */}
      <div className="relative w-full">
        <div className="w-full h-[250px] overflow-hidden relative">
          <img
            src={groupImage || DefaultGroupImage}
            alt="그룹 이미지"
            className="w-full h-full object-cover opacity-60"
          />

          {/* 하단 흰색 그라데이션 오버레이 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.7) 60%, rgba(255, 255, 255, 1) 100%)',
            }}
          ></div>

          {/* 그룹 정보 */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
            <div className="flex flex-col gap-2">
              <Headline1 className="text-black-400">{groupName}</Headline1>
              <Body2 className="text-black-400 line-clamp-2">{groupDescription}</Body2>
              {members.length > 0 && <MemberAvatars members={members} maxDisplay={5} />}
            </div>
          </div>

          {/* 메뉴 아이콘 */}
          <button
            ref={buttonRef}
            onClick={handleMenuToggle}
            className={`absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-colors z-20 ${
              isMenuOpen
                ? 'bg-white-50 border-2 border-yellow-300'
                : 'bg-white-50/90 hover:bg-white-50 backdrop-blur-sm'
            }`}
            aria-label="메뉴 열기"
          >
            <img src={DotsIcon} alt="메뉴" className="w-6 h-6" />
          </button>

          {/* 드롭다운 메뉴 */}
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-12 right-3 bg-white-50 rounded-lg shadow-lg border border-black-200 min-w-[120px] z-30"
            >
              {isLeader ? (
                <>
                  <button
                    onClick={handleEditClick}
                    className="w-full px-4 py-2 text-left hover:bg-white-100 transition-colors first:rounded-t-lg"
                  >
                    <Body2 className="text-black-400">그룹 수정</Body2>
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    disabled={isDeleting}
                    className={`w-full px-4 py-2 text-left transition-colors last:rounded-b-lg ${
                      isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white-100'
                    }`}
                  >
                    <Body2 className="text-red-200">
                      {isDeleting ? '삭제 중...' : '그룹 삭제'}
                    </Body2>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLeaveClick}
                  className="w-full px-4 py-2 text-left hover:bg-white-100 transition-colors rounded-lg"
                >
                  <Body2 className="text-red-200">그룹 나가기</Body2>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <div className="border-t border-black-200">
        <div className="flex">
          <button
            onClick={onShareInviteLink}
            className="flex-1 flex items-center justify-center gap-2 py-3 border-r border-black-200"
          >
            <img src={LinkIcon} alt="링크" className="w-5 h-5" />
            <Button1 className="text-black-400">초대 링크 공유</Button1>
          </button>
          <button
            onClick={onCreateEvent}
            className="flex-1 bg-green-400 flex items-center justify-center gap-2 py-3"
          >
            <Button1 className="text-white-50">새 이벤트 만들기</Button1>
          </button>
        </div>
      </div>
    </div>
  );
}
