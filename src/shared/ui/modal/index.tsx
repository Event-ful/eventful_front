import { useEffect, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  maxWidth?: string;
  closeOnBackdropClick?: boolean;
}

/**
 * 모달 컴포넌트
 *
 * @description
 * 다양한 페이지에서 사용할 수 있는 모달 컴포넌트입니다.
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  maxWidth = '600px',
  closeOnBackdropClick = true,
}: ModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative bg-white-50 rounded-xl shadow-lg w-full"
        style={{ maxWidth }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
