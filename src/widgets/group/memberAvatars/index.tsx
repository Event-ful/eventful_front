import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Body4 } from '@/shared/ui/typography';

interface MemberAvatarsProps {
  /** 멤버 목록 */
  members: Array<{
    memberId: number;
    memberName: string;
    leader?: boolean;
  }>;
  /** 최대 표시할 아바타 개수 (기본값: 6) */
  maxDisplay?: number;
}

/**
 * 멤버 아바타 그룹 컴포넌트
 *
 * @description
 * 여러 멤버의 아바타를 겹쳐서 표시하는 컴포넌트입니다.
 * 최대 표시 개수를 초과하는 경우 가장 위에 +n 형태로 표시합니다.
 * 멤버 이름의 첫 글자를 표시하며, 배경색은 랜덤으로 선택됩니다.
 */
export default function MemberAvatars({ members, maxDisplay = 6 }: MemberAvatarsProps) {
  // 밝은 색상 목록 (tailwind.config.js에서 정의된 색상)
  const lightColors = ['bg-green-100', 'bg-green-200', 'bg-blue-100', 'bg-yellow-100'];

  // 멤버 이름의 첫 글자 추출
  const getInitial = (name: string): string => {
    if (!name || name.length === 0) return '?';
    return name.charAt(0).toUpperCase();
  };

  // 멤버 이름을 기반으로 일관된 색상 선택 (해시 함수 사용)
  const getColorForMember = (memberId: number): string => {
    const index = memberId % lightColors.length;
    return lightColors[index];
  };

  // 표시할 멤버와 나머지 개수 계산
  const displayMembers = members.slice(0, maxDisplay);
  const remainingCount = members.length > maxDisplay ? members.length - maxDisplay : 0;

  if (members.length === 0) {
    return null;
  }

  return (
    <div className="flex -space-x-2">
      {displayMembers.map(member => (
        <Avatar
          key={member.memberId}
          className="border-2 border-white-50 shadow-md"
          data-slot="avatar"
        >
          <AvatarFallback
            className={`${getColorForMember(member.memberId)} text-black-400 font-semibold`}
          >
            {getInitial(member.memberName)}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar className="border-2 border-white-50 bg-black-200 shadow-md" data-slot="avatar">
          <AvatarFallback className="text-white-50 font-semibold">
            <Body4 className="text-[10px]">+{remainingCount}</Body4>
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
