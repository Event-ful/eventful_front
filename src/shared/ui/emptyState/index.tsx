import { Body2 } from '../typography';
import EmptyIcon from '@/assets/svg/warning.svg';

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center gap-1 py-2">
      <img src={EmptyIcon} alt="데이터 없음" className="opacity-50 w-4 h-4" />
      <Body2 className="text-black-300">{message}</Body2>
    </div>
  );
}
